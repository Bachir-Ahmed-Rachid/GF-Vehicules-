const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Vehcule=require('../modeles/vehcule');
const Expidtion=require('../modeles/expidition');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken='pk.eyJ1IjoiYmFjaGlyNjEzIiwiYSI6ImNsM3VyOHU2NjFrc3UzY2x0dGl4Y2tmNXIifQ.76ZvoTcZFXgud1EyiRN1xQ'
const geodcoder=mbxGeocoding({accessToken:mapBoxToken});
const mongoose=require('mongoose');





router.get('/:id', catchAsync(async(req, res) => {
    const{id}=req.params
    const vehiculeActif=await Vehcule.findById(id)
    const Expid=await Expidtion.findOne({
        'vehcules':{ $in: [
            mongoose.Types.ObjectId(id),
        ]}
    });
    const {routing}=vehiculeActif
    
    for(let i=0;i<routing.length;i++){
        const geocode=await geodcoder.forwardGeocode({
            query: `${routing[i]}, Algeria`,
            limit: 1
            })
            .send()
            vehiculeActif.location.push(geocode.body.features[0].geometry.coordinates) //ROUTING CORRDINATES
        }
    await vehiculeActif.save()
    
	 res.render('vehiculesActif/show',{ vehiculeActif,Expid })
}))

module.exports=router