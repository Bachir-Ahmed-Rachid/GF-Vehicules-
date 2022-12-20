const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Vehcule=require('../modeles/vehcule');
router.get('/:id/:routing', catchAsync(async(req, res) => {
    const{id,routing}=req.params
    const vehicule=await Vehcule.findById(id)
    const palette=vehicule.items_packed[`${routing}`]
	res.render('palettes/show',{ palette,routing ,vehicule})
}))
module.exports=router
