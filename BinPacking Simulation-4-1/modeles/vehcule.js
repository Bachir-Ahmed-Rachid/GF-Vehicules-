const mongoose=require('mongoose');
const { Schema } = mongoose;

const vehculeSchema = new Schema({
  imatricultion:String,
  index:String,
  cost:Number,
  items_packed:{},
  routing :[],
  image:String,
  type: String,
  capacite:Number,
  location:[],
  Taux:Number,
  historic:[],
  Disponibilite:Boolean,
  reelPosition:{
    type: {
      type: String, 
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false
    }
  }
 
});

module.exports = mongoose.model('Vehcule', vehculeSchema);
        
 // poidMaximum :Number,
  // dimentionMaximum :Number,







