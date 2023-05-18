const mongoose=require('mongoose');
const { Schema } = mongoose;

const customerChartsSchema = new Schema({
    infoChart:[],
    Customer:String,
    
});

module.exports = mongoose.model('customerChart', customerChartsSchema);
        








