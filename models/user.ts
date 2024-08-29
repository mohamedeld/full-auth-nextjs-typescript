import {Schema,models,model} from "mongoose";

const userSchema = new Schema({
  first_name:{
    type:String,
    required:[true,'first name is required']
  },
  last_name:{
    type:String,
    required:[true,'last name is required']
  },
  email:{
    type:String,
    required:[true,'email is required']
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  phone:{
    type:String,
    required:[true,'phone is required']
  }
});

const User = models?.User || model("User",userSchema);

export default User;