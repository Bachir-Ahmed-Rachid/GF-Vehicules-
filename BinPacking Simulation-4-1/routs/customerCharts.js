const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const CustomerChart=require('../modeles/customerChart')

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
    const customerCharts=await CustomerChart.find({})
	res.render('customerCharts/index',{ customerCharts })
}))

router.get('/:id', catchAsync(async(req, res) => {
    const{id}=req.params
    const customerCharts=await CustomerChart.findById(id)
	res.render('customerCharts/show',{ customerCharts })
}))
module.exports=router
