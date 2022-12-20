const mongoose=require('mongoose');
const Typevehcules=require('./typeVehicules/typeVehicule');
const TypeVehicule=require('../modeles/typeVehicules');

const Vehcule=require('../modeles/vehcule');
const Vehcules=require('./véhcules/vehcules')

const Expidtion=require('../modeles/expidition');


const Transporteur=require('../modeles/transporteur');
const transporteurs=require('./transporteurs/transporteus')

mongoose.connect('mongodb://localhost:27017/binPaking',{
    useNewUrlParser:true,
});
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log(("Database connected"));
});

const SeedDb = async ()=>{
    await TypeVehicule.deleteMany({});
    await Vehcule.deleteMany({});
    for(let i=0;i<Typevehcules.length;i++){
        const Typevhcl= new TypeVehicule({
            discreption:`${Typevehcules[i].discreption}`,
            cost: `${Typevehcules[i].cost}`,
            image:`${Typevehcules[i].image}`,
            type: `${Typevehcules[i].type}`,
            poidMaximum :`${Typevehcules[i].poidMaximum}`,
            dimentionMaximum :`${Typevehcules[i].dimentionMaximum}`, 
                                                })
            const vehcl=await new Vehcule({
                index:`${Vehcules[i].index}`,
                imatricultion:`${Vehcules[i].imatricultion}`,
                image:`${Vehcules[i].image}`,
            })
        await vehcl.save();
        Typevhcl.vehcules.push(vehcl)
        await Typevhcl.save();
    };

    
    await Expidtion.deleteMany({});
    for(let i=0;i<1;i++){
        const Expid= new Expidtion({date:'29/5/2019',nomberVehicules:6,etat:'En cours'})
       
            const vehcl=await new Vehcule({
                index:`${Vehcules[3].index}`,
                cost:`${Vehcules[3].cost}`,
                items_packed:`${Vehcules[3].items_packed}`,
                routing :[Vehcules[3].routing],
                image:`${Vehcules[3].image}`,
                type: `${Vehcules[3].type}`,
                capacite:`${Vehcules[3].capacite}`
                
            })
            await vehcl.save();
            Expid.vehcules.push(vehcl)
       
        await Expid.save();
    };

    await Transporteur.deleteMany({});
    for(let i=0;i<transporteurs.length;i++){
        const transporteur= new Transporteur({
            nom:`${transporteurs[i].nom}`,
            prenom:`${transporteurs[i].prenom}`,
            photo:`${transporteurs[i].photo}`,
            disponibilité:`${transporteurs[i].disponibilité}`,
            TypePermis:`${transporteurs[i].TypePermis}`
        })
        await transporteur.save();
    }
    

}

SeedDb().then(()=>{
    mongoose.connection.close();
})
