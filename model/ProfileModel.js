import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true,
    },
    bio:String,
    headline:String,
    profileImage:String,
    resume:String,
    projectImages:[String],
    introVideo:String,
});

const profile = mongoose.model("profile",profileSchema)

export default profile;