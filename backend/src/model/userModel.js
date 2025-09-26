import mongoo from 'mongoose'

const schema=mongoo.Schema({
        firstName:{
            type:"string",
            require:"true"
        },
        lastName:{
            type:"string",
            require:"true"
        },
        email:{
            type:"string",
            require:"true",
            unique:"true",
        },
        password:{
            type:"string",
            reuired:"true",
        }
})

const User=mongoo.model('User',schema);

export default User;