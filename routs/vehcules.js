const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const TypeVehcule=require('../modeles/typeVehicules');
const{vehculeTypeSchema}=require('../shemas');

const validateTypeVehicule=(req,res,next)=>{
    const {error}=vehculeTypeSchema.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(',')
            throw new ExpressError(msg,400)
        }else{
            next()
        }
}

router.get('/', catchAsync(async(req, res) => {
    const vehcules=await TypeVehcule.find({})
	res.render('vehcules/index',{ vehcules })
}))


router.get('/new', async(req, res) => {
	res.render('vehcules/new')
});




router.post('/',validateTypeVehicule, catchAsync(async(req,res) => {
    const vehcule=new TypeVehcule(req.body.vehculeType)
    await vehcule.save()
    res.redirect(`/vehcules/${vehcule._id}`)
}))




router.get('/:id/edit', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
	res.render('vehcules/edit',{ vehcule })
}))


router.get('/:id', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id).populate('vehcules')
	res.render('vehcules/show',{ vehcule })
}))



router.put('/:id', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findByIdAndUpdate(req.params.id,req.body.vehcule);
    await vehcule.save()
    res.redirect(`/vehcules/${vehcule._id}`)

}));



router.delete('/:id', catchAsync(async(req, res) => {
    await TypeVehcule.findByIdAndDelete(req.params.id);
    res.redirect("/vehcules")
}));


module.exports=router