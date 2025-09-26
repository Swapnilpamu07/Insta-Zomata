import mongoo from 'mongoose'

const schema=mongoo.Schema({
    restaurantName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    businessEmail:{
        type:String,
        required:true,
        unique:true
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true
    },
    businessAdd:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    }
})

const foodPartner=mongoo.model('foodPartner',schema);

export default foodPartner;