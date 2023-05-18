const joi=require('joi');
module.exports.vehculeTypeSchema=joi.object({
    vehculeType:joi.object({
        cost:joi.number().required(),
        discreption:joi.string().required(),
        image:joi.string().required(),
        type: joi.string().required(),
        poidMaximum :joi.number().required(),
        dimentionMaximum :joi.number().required(),
        vehcules:joi.required()
        
    }).required()
})


module.exports.vehculeSchema=joi.object({
    vehcule:joi.object({
        index:joi.string().required(),
        cost:joi.number().required(),
        items_packed:joi.array(),
        routing :joi.array().required(),
        image:joi.string().required(),
        type: joi.string().required(),
        capacite:joi.number().required(),
        location:joi.array().required(),
        Taux:joi.number().required(),
        historique:joi.array().required(),
        reelPosition:joi.required(),
        imatricultion:joi.string().required()
       
    })
})


module.exports.expidtionSchema=joi.object({
    expidtion:joi.object({
        vehcules:joi.required(),
        transporteurs:joi.required(),
        date:joi.string().required(),
        nomberVehicules:joi.number().required(),
        etat:joi.string().required(),
        expidRouting:joi.array().required()
        
    })
})
module.exports.customerChartSchema=joi.object({
    customerChart:joi.object({
        infoChart:joi.array().required(),
        Customer:joi.string().required(),
    })
})
module.exports.transporteurSchema=joi.object({
    transporteur:joi.object({
        nom:joi.string().required(),
        prenom:joi.string().required(),
        photo:joi.string().required(),
        disponibilité:joi.boolean(),
        TypePermis:joi.string().required(),
    })
});

