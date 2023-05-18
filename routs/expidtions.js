const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Expidtion=require('../modeles/expidition');
const TypeVehcule=require('../modeles/typeVehicules');
const Vehcule=require('../modeles/vehcule');
const Transporteur=require('../modeles/transporteur');
const CustomerChart=require('../modeles/customerChart')



const{expidtionSchema,customerChartSchema}=require('../shemas');
const { route } = require('./vehcules');



const validateExpidition=(req,res,next)=>{
    const {error}=expidtionSchema.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(',')
            throw new ExpressError(msg,400)
        }else{
            next()
        }
}
const validateCustomerChart=(req,res,next)=>{
    const {error}=customerChartSchema.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(',')
            throw new ExpressError(msg,400)
        }else{
            next()
        }
}

router.get('/', catchAsync(async(req, res) => {
    const expidtions=await Expidtion.find({})
	res.render('expidtions/index',{ expidtions })
}))



router.post('/finalConfirme/:finalResults',catchAsync(async(req, res) => {
    const{finalResults}=req.params
    final_result_J=JSON.parse(finalResults)
    let today = new Date();
    let dateToday = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const Expid= new Expidtion({date:dateToday,nomberVehicules:final_result_J.vehicules.length,etat:'En cours'})
    let vehcul
        for(let vehcule of final_result_J.vehicules){
            vehcul =await Vehcule.find({index:vehcule.index})
            vehcul[0].routing=vehcule.routing
            vehcul[0].Disponibilite=false
            vehcul[0].items_packed=vehcule.items_packed
            Expid.vehcules.push(vehcul[0])
            await vehcul[0].save()
        }
        for(let transport of final_result_J.transporteur){
            const transporteur=await Transporteur.find({name:transport})
            transporteur[0].disponibilité=false
            await transporteur[0].save()
            Expid.transporteurs.push(transporteur[0])
        }
        
         Expid.expidRouting=final_result_J.demande
         await Expid.save()
         res.redirect('/expidtions')

}))

router.get('/confirme/:dataInput', catchAsync(async(req, res) => {
    const{dataInput}=req.params
    const dataInput_json=JSON.parse(dataInput)
    for(let type of dataInput_json.Fleet){
        const typeUsed=await TypeVehcule.find({poidMaximum:parseInt(type.Vehicules.split('_')[1].split('t')[0])})
        type['Capacity']=typeUsed[0].poidMaximum
        type['Cost']=typeUsed[0].cost
       
    }
    dataInput_json_data=JSON.stringify(dataInput_json)
    res.render('expidtions/showInput',{inputs:dataInput_json,data:dataInput_json_data})
 }));

router.get('/new', async(req, res) => {
    const vehcules=await TypeVehcule.find({})
	res.render('expidtions/new',{vehcules})
})


router.get('/:id', catchAsync(async(req, res) => {
    const expidtion=await Expidtion.findById(req.params.id).populate('vehcules')
    console.log(expidtion)
	res.render('expidtions/show',{ expidtion })
}))


router.put('/:id',validateCustomerChart,catchAsync(async(req, res) => {
    let today = new Date();
    let dateToday = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const{id}=req.params
    const Expid=await Expidtion.findById(id)
    for(let veh of Expid.vehcules){
        const vehic=await Vehcule.findByIdAndUpdate(veh._id,{Disponibilite:true})
        await vehic.save()
    }

    for(let trans of Expid. transporteurs){
        const transpo=await Transporteur.findByIdAndUpdate(trans._id,{disponibilité:true})
        await transpo.save()
    }
    
    for(let customer of Expid.expidRouting){
        let cutomerShart=await CustomerChart.findOne({Customer:customer.Customer})
        if(cutomerShart===null){
            cutomerShart=await new CustomerChart({Customer:customer.Customer})
        }
        cutomerShart.infoChart.push({'Dilevery':customer.Dilevery,'Pickup':customer.Pickup,'date':dateToday})
        await cutomerShart.save()
    }
    const expid =await Expidtion.findByIdAndUpdate(id,{ etat: 'Terminer' });
    await expid.save()
    res.redirect("/expidtions")
}));
//______________________________________________________


router.delete('/:id', catchAsync(async(req, res) => {
    await Expidtion.findByIdAndDelete(req.params.id);
    res.redirect("/expidtions")
}));

module.exports=router