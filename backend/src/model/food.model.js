import mongoo from 'mongoose'


const schema=mongoo.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true
    },
    desc:{
        type:"String",
    },
    foodPartner:{
        type:mongoo.Schema.Types.ObjectId,
        ref:"foodPartner"
    }
})

const foodModel=mongoo.model("food",schema);

export default foodModel;