const mongoose=require('mongoose');
const { Schema } = mongoose;

const typeVehiculesSchema = new Schema({
  cost:Number,
  discreption: String,
  image:String,
  type: String,
  poidMaximum :Number,
  dimentionMaximum :Number,
  vehcules:[{ type: Schema.Types.ObjectId, ref: 'Vehcule' }],

});

typeVehiculesSchema.post('findOneAndDelete',async function(doc){
  if(doc){
    await Vehcule.deleteMany({
      _id:{
        $in:doc.vehcules
      }
    })
  }
})

module.exports = mongoose.model('TypeVehicule', typeVehiculesSchema);
        








