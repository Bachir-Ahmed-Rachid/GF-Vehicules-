const mongoose=require('mongoose');
const { Schema } = mongoose;
const transporteurSchema = new Schema({
    nom:String,
    prenom:String,
    photo:String,
    disponibilité:Boolean,
    TypePermis:String
});

module.exports = mongoose.model('transporteur', transporteurSchema);