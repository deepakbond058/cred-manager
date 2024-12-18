import mongoose from 'mongoose'
const credentialSchema = new mongoose.Schema({
    id:String,
    site:String,
    username:String,
    password:String
});
export default mongoose.model('credmongoDB',credentialSchema) 