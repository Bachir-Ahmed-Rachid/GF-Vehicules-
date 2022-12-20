const express = require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const Transporteur=require('./modeles/transporteur');
const engine = require('ejs-mate');
const methodOverride=require('method-override');
const session=require('express-session');
const flash = require('connect-flash');
const catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const{vehculeSchema}=require('./shemas')
const Vehcule=require('./modeles/vehcule');
const TypeVehcule=require('./modeles/typeVehicules');






const vehcules=require('./routs/vehcules')
const expidtions=require('./routs/expidtions')
const VehiculesActifs=require('./routs/VehiculesActif')
const customerCharts=require('./routs/customerCharts')
const palettes=require('./routs/palettes')
const calculates=require('./routs/calculate')
const transporteurs=require('./routs/transporteur')
const groupeVehules=require('./routs/groupeVehule')







mongoose.connect('mongodb://localhost:27017/binPaking',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("database connected")
})


app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static("public"));
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




app.get('/', (req, res) => {
	res.render('home')
})



app.use('/vehcules',vehcules)
app.use('/expidtions',expidtions)
app.use('/VehiculesActif',VehiculesActifs)
app.use('/customerCharts',customerCharts)
app.use('/palettes',palettes)
app.use('/calculate',calculates)
app.use('/transporteurs',transporteurs)
app.use('/vehcules/:id/groupeVehules',groupeVehules)

app.all('*',(req,res,next)=>{
    next(new(ExpressError('page not found',404)))
})

app.use((err,req,res,next)=>{
    const{statusCode=500}=err
    if(!err.message) err.message='Somthing went wrong!'
    res.status(statusCode).render('error',{err})
})



app.listen(3000, () => {
    console.log("server is running on port 3000");
})

















//______________________________________________________

// app.get('/example',catchAsync(async(req, res)=>{
//     const result=await optimize();
//     let vehcules=[]
//     let newVehicule
//     for(vehcule of result.result){
//         newVehicule= new Vehcule(vehcule)
//         newVehicule.capacite=vehcule.image.split('t')[0]
//         newVehicule.routing.push('Alger')
//         for(let i=0;i<newVehicule.routing.length;i++){
//             geocode=await geodcoder.forwardGeocode({
//                query: `${newVehicule.routing[i]}, Algeria`,
//                limit: 1
//              })
//                .send()
//                coordinates.push(geocode.body.features[0].geometry.coordinates)
//            }
//            newVehicule.location=coordinates
//            await newVehicule.save()
//            vehcules.push(newVehicule)
           
        
        
//     }
    
//        res.render('vehcules/example',{ vehcules })
  
// }));
