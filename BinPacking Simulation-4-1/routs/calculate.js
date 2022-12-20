const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Expidtion=require('../modeles/expidition');
const Vehcule=require('../modeles/vehcule');
const Transporteur=require('../modeles/transporteur');
const{vehculeSchema,expidtionSchema}=require('../shemas');
const request = require('request-promise');
async function optimize(dataInput) {
    let result
    let data = dataInput
    let options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5000/optimizeBin',
        body: data,
        json: true
    };
  
    let sendrequest = await request(options)
        .then(function (parsedBody) {
             result=parsedBody; 
        })
        .catch(function (err) {
            console.log(err);
        });
    return result
}

const validateVehicule=(req,res,next)=>{
    const {error}=vehculeSchema.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(',')
            throw new ExpressError(msg,400)
        }else{
            next()
        }
}


const validateExpidition=(req,res,next)=>{
    const {error}=expidtionSchema.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(',')
            throw new ExpressError(msg,400)
        }else{
            next()
        }
}

router.get('/:input', async(req, res) => {
    const inputs=req.params.input
    const result=await optimize(inputs)
    const Jinput=JSON.parse(inputs)
    const vehcule =await Vehcule.find({Disponibilite:true})
    const transporteur=await Transporteur.find({disponibilité:true})
    res.render('expidtions/confirme',{Jinput,result,inputs,transporteur,vehcule})

})
module.exports=router


















// let today = new Date();
// let dateToday = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

// const Expid= new Expidtion({date:dateToday,nomberVehicules:result.vehcule.length,etat:'En cours'})
//     for(let vehcule of result.vehcule){
//         const vehcul=new Vehcule(vehcule)
//         await vehcul.save()
//         Expid.vehcules.push(vehcul)
//     }
//     Expid.expidRouting=Jinput.Demande
//     await Expid.save()