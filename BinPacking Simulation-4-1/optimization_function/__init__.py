#######################################################################
# Imort Packages
#######################################################################
import pandas as pd
import numpy as np
import json
#######################################################################
# Imort Classes
#######################################################################
from vehcilePackage.vehcile import Vehcile
from palettePackage.palette import Palette
from customerPackage.customer import Customer

#######################################################################
# Import the libraries
#######################################################################

import pyomo.environ as pyo
from pyomo.environ import *
# importer le pakage qui permet d'utiliser les solver
from pyomo.opt import SolverFactory


#######################
# creation of function
#######################
def vehcile_props(vehcile, data):
    for i in range(len(data.Vehicules)):
        if data.Vehicules[i].split('_')[1] == vehcile.split('_')[1]:
            return {'Capacity': data.Capacity[i], 'Cost': data.Cost[i]}


def routing(items_packed,firstCustomer):
    finale_list = []
    inter_list = [items_packed[i].split('_')[0]
                  for i in range(len(items_packed))]
    for i in range(len(inter_list)):
        if(inter_list[i] not in finale_list):
            finale_list.append(inter_list[i])
    finale_list.insert(0,firstCustomer)
    return finale_list


#######################################################################
# Inputs
#######################################################################
data_fleet_input = pd.read_excel('E:/BinPacking Simulation/optimization_function/Data -2.xlsx',
                           sheet_name='Fleet')  # importe fleet from sheet
data_demande_input = pd.read_excel('E:/BinPacking Simulation/optimization_function/Data -2.xlsx',
                             sheet_name='Demande')  # importe demande from sheet
#######################


def Opt_Bin_Paking(data_fleet, data_demande):
    #######################################################################
    # creation of palettes
    #######################
    # dilevery palettes
    Dilevery_palettes = [Palette('D_palette_'+str(j+1), 'Dilevery', data_demande.Customer[i]) for i in range(1, len(data_demande)) for j in range(data_demande.Dilevery[i])]
    # pickup palettes
    Pickup_palettes = [Palette('P_palette_'+str(j+1), 'Pickup', data_demande.Customer[i]) for i in range(1, len(data_demande)) for j in range(data_demande.Pickup[i])]
    #######################
    # creation of vehcules
    #######################
    Vehicules = [Vehcile('Truck_'+str(j+1), data_fleet.Capacity[i], data_fleet.Cost[i], data_fleet.Vehicules[i], [], []) for i in range(len(data_fleet)) for j in range(len(Dilevery_palettes))]
    #######################
    # creation of type of vehcules
    #######################
    type_variation = [data_fleet.Vehicules[i] for i in range(len(data_fleet))]
    #######################
    # creation of customers
    #######################
    Customers = [Customer(data_demande.Customer[i], data_demande.Dilevery[i], data_demande.Pickup[i]) for i in range(len(data_demande))]
    #######################
    # variation of dilevery palettes
    #######################
    dilevery_palette_variation = [Dilevery_palettes[i].get_adress()+'_'+Dilevery_palettes[i].get_index() for i in range(len(Dilevery_palettes))]
    #######################
    # variation of pickup palettes
    #######################
    pickup_palette_variation = [Pickup_palettes[i].get_adress()+'_'+Pickup_palettes[i].get_index() for i in range(len(Pickup_palettes))]
    #######################
    # variation of vehciles
    #######################
    vehicle_variation = {'Type_'+str(data_fleet.Capacity[i])+'t': {'Cost': data_fleet.Cost[i], 'Capacity': data_fleet.Capacity[i], 'UpperBound': ['truck'+str(j+1) for j in range(len(dilevery_palette_variation))]} for i in range(len(data_fleet))}
    #######################
    # customer variation
    #######################
    customer_variation = {data_demande.Customer[i]: {'Dilevery': data_demande.Dilevery[i], 'Pickup': data_demande.Pickup[i]} for i in range(len(data_demande))}
    #######################
    # customer list variation
    #######################
    customer_list = list(customer_variation.keys())
    # creation of upperBounds
    #######################
    upper_bounds = ['truck'+str(j+1)+'_'+str(data_fleet.Capacity[i])+'t' for j in range(max(len(dilevery_palette_variation), len(pickup_palette_variation))) for i in range(len(data_fleet))]
    #######################
    # model creation
    #######################
    model = pyo.ConcreteModel()
    #####################################################################
    # Variables creation
    # y[i] = 1 if the vehicle i is used and 0 otherwise
    # x[l,i] = 1 if the palette l is packed into the vehicle
    #####################################################################
    model.x = pyo.Var(dilevery_palette_variation, upper_bounds, within=Binary)
    model.y = pyo.Var(upper_bounds, within=Binary)
    x = model.x
    y = model.y
    ##############################
    # Constraints formuation
    ##############################

    # Each item must be in exactly one bin.
    model.Unicity_palettes = ConstraintList()
    for l in dilevery_palette_variation:
        model.Unicity_palettes.add(sum(x[l, i] for i in upper_bounds) == 1)

    intermediate_list = []
    model.Capacity = ConstraintList()
    for k in customer_variation.keys():
        intermediate_list.append(k)
        for i in upper_bounds:
            model.Capacity.add(expr=sum(x[l, i] for l in dilevery_palette_variation)-sum(customer_variation[c]['Dilevery'] for c in intermediate_list)+sum(
                customer_variation[c]['Pickup'] for c in intermediate_list) <= vehcile_props(i, data_fleet)['Capacity']*y[i]+(1-y[i])*(sum(customer_variation[c]['Pickup'] for c in intermediate_list)-sum(customer_variation[c]['Dilevery'] for c in intermediate_list)))

    # Define the objective
    model.obj = Objective(expr=sum(vehcile_props(i, data_fleet)[
                          'Cost']*y[i] for i in upper_bounds), sense=minimize)
    opt = SolverFactory('gurobi')
    results = opt.solve(model)
    ##############################
    # Print Results
    ##############################
    vehciles_Used = []
    final_Affectation_list = []
    for i in upper_bounds:
        Index = i
        if pyo.value(y[i]) == 1:
            vehciles_items = []
            for l in dilevery_palette_variation:
                if pyo.value(x[(l, i)]) == 1:
                    vehciles_items.append(l)
            if len(vehciles_items) > 0:
                vehciles_items_ = {customer_list[0]: vehciles_items}
                vehciles_Used.append(Vehcile(i, vehcile_props(i, data_fleet)['Capacity'], vehcile_props(i, data_fleet)['Cost'], i.split('_')[1], routing(vehciles_items,data_demande.Customer[0]), vehciles_items_))

  ##############################
  # creat the finale affectation
  ##############################
    for i in vehciles_Used:
        final_Affectation = {
            'index': i.get_index(),
            'cost': int(i.get_cost()),
            'items_packed': i.get_items_packed(),
            'routing': i.get_routing(),
            'image': i.get_Type(),
            'type': i.get_Type(),
            'capacite': int(i.get_capacity())}
        final_Affectation_list.append(final_Affectation)
        
    
    for vehiculeUsed in final_Affectation_list:
        routing_Vh_used=vehiculeUsed['routing']
        for i in range(1,len(routing_Vh_used)):
            bin_stage=[j for j in (vehiculeUsed['items_packed'][str(routing_Vh_used[i-1])] ) if j.split('_')[0]!=routing_Vh_used[i]]
            l=0
            while l < len(pickup_palette_variation) and len(bin_stage)<vehiculeUsed['capacite']:
                if pickup_palette_variation[l].split("_")[0] == routing_Vh_used[i]:
                    bin_stage.append(pickup_palette_variation[l])
                    pickup_palette_variation.remove(pickup_palette_variation[l])
                    l = l-1
                l = l+1
            vehiculeUsed['items_packed'][routing_Vh_used[i]]=bin_stage
    return final_Affectation_list

    
            
            

    


    


















    
   



























