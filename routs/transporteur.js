const express=require('express')
const router=express.Router({mergeParams:true})
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Transporteur=require('../modeles/transporteur');
const{transporteurSchema}=require('../shemas');

const validateTransporteur=(req,res,next)=>{
    const {error}=transporteurSchema.validate(req.body)
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next()
    }
};


router.get('/', catchAsync(async(req, res) => {
    const transporteurs=await Transporteur.find({})
	res.render('transporteurs/index',{ transporteurs })
}))
router.get('/new', async(req, res) => {
	res.render('transporteurs/new')
})
router.post('/',validateTransporteur, catchAsync(async(req,res,next) => {
    const transporteur=new Transporteur(req.body.transporteur)
    await transporteur.save()
    res.redirect(`/transporteurs/${transporteur._id}`)

}));
router.get('/:id', catchAsync(async(req, res) => {
    const transporteur=await Transporteur.findById(req.params.id)
	res.render('transporteurs/show',{ transporteur })
}))
router.get('/:id/edit', catchAsync(async(req, res) => {
    const transporteur=await Transporteur.findById(req.params.id)
	res.render('transporteurs/edit',{ transporteur })
}))
router.put('/:id', catchAsync(async(req, res) => {
	const transporteur=await Transporteur.findByIdAndUpdate(req.params.id,req.body.transporteur);
    await transporteur.save()
    res.redirect(`/transporteurs/${transporteur._id}`)

}))
router.delete('/:id', catchAsync(async(req, res) => {
	await Transporteur.findByIdAndDelete(req.params.id);
    res.redirect("/transporteurs")

}))

module.exports=router