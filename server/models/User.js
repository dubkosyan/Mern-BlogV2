import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    username:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
        unique: true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
},
    {timestamps:true},
)

export default mongoose.model('User', UserSchema)