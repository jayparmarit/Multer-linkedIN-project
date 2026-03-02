import mongoose from "mongoose";

async function connectDB(){
    try{
        const connectDB = await mongoose.connect("mongodb://127.0.0.1:27017//linkedin")
        console.log("db connect",connectDB);
    }catch (error){
        throw new error (error.message);
    }
    
}
export default connectDB;