const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Vehcule=require('../modeles/vehcule');
const TypeVehcule=require('../modeles/typeVehicules');

const{vehculeSchema}=require('../shemas');

const validateVehicule=(req,res,next)=>{
    const {error}=vehculeSchema.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(',')
            throw new ExpressError(msg,400)
        }else{
            next()
        }
}




router.get('/new', async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
	res.render('groupeVehules/new',{vehcule})
})

router.post('/',catchAsync(async(req,res,next) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
    const groupeVehcule=await new Vehcule(req.body.groupeVehcule)
    groupeVehcule.Disponibilite=true
    groupeVehcule.capacite=vehcule.poidMaximum
    vehcule.vehcules.push(groupeVehcule)
    await vehcule.save()
    await groupeVehcule.save()
    res.redirect(`/vehcules/${vehcule._id}`)

}));



router.get('/:idGrpVeh/edit', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
    const groupeVehcule=await Vehcule.findById(req.params.idGrpVeh)
	res.render('groupeVehules/edit',{ groupeVehcule ,vehcule})
}))



router.get('/:idGrpVeh', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
    const groupeVehcule=await Vehcule.findById(req.params.idGrpVeh)
	res.render('groupeVehules/show',{ groupeVehcule ,vehcule})
}))






router.put('/:idGrpVeh', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
	const groupeVehcule=await Vehcule.findByIdAndUpdate(req.params.idGrpVeh,req.body.groupeVehcule);
    await groupeVehcule.save()
    res.redirect(`/vehcules/${vehcule._id}/groupeVehules/${groupeVehcule._id}`)

}))



router.delete('/:idGrpVeh', catchAsync(async(req, res) => {
    const vehcule=await TypeVehcule.findById(req.params.id)
	await Vehcule.findByIdAndDelete(req.params.idGrpVeh);
    res.redirect(`/vehcules/${vehcule._id}`)

}))

module.exports=router