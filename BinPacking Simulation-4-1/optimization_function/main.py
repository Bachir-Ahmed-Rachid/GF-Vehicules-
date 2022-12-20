from flask import Flask, request
import json
import pandas as pd
from __init__ import Opt_Bin_Paking
data_fleet = pd.read_excel('E:/BinPacking Simulation/optimization_function/Data -2.xlsx',
                           sheet_name='Fleet')  # importe fleet from sheet
data_demande = pd.read_excel('E:/BinPacking Simulation/optimization_function/Data -2.xlsx',
                             sheet_name='Demande')  # importe demande from sheet
# Setup flask server
app = Flask(__name__)
@app.route('/optimizeBin', methods=['POST'])

def claculte_min_cost():
    data = json.loads(request.get_json())
    data_fleet=pd.DataFrame.from_dict(data['Fleet'])
    data_demande=pd.DataFrame.from_dict(data['Demande'])
    vehcule = Opt_Bin_Paking(data_fleet, data_demande)
    return json.dumps({'vehcule': vehcule})

if __name__ == "__main__":
    app.run(port=5000)
