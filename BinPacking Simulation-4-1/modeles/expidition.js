const mongoose=require('mongoose');
const { Schema } = mongoose;
const Vehcule=require('./vehcule');
const Transporteur=require('./transporteur');
const expiditionSchema = new Schema({
  date:String,
  nomberVehicules:Number,
  vehcules:[{ type: Schema.Types.ObjectId, ref: 'Vehcule' }],
  transporteurs:[{ type: Schema.Types.ObjectId, ref: 'Transporteur' }],
  etat:String,
  expidRouting:[]
  
});


expiditionSchema.post('findOneAndDelete',async function(doc){
  if(doc){
    await Vehcule.deleteMany({
      _id:{
        $in:doc.vehcules
      }
    }),
    await Transporteur.deleteMany({
      _id:{
        $in:doc.transporteurs
      }
    })
  }
})
module.exports = mongoose.model('Expidition', expiditionSchema);
        








