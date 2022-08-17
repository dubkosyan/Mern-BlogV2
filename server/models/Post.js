import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    username:{type: 'string'},
    title:{type: 'string',required: true},
    text:{type: 'string',required: true},
    imgUrl:{type: 'string',default: ''},
    views:{type:'Number',default: 0},
    author:{type:mongoose.Schema.Types.ObjectId, ref :'User'},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]

},{timestamps:true})

export default mongoose.model('Post',PostSchema)