import mongoose, { mongo } from "mongoose";

if(!process.env.MONGODB_URL){
  throw new Error("Please add the database url");
}

const databaseUrl:string = process.env.MONGODB_URL;

let globalWithMongoose = global as typeof globalThis &{
  mongoose:any;
}

let cached = globalWithMongoose?.mongoose;

if(!cached){
  cached= globalWithMongoose.mongoose = {conn:null,promise:null}
}

async function connectDB(){
  if(cached){
    return cached.conn;
  }
  if(!cached.promise){
    cached.promise = mongoose.connect(databaseUrl).then((mongoose)=>{
      console.log('connection has been established');
      return mongoose;
    }).catch(err=> console.log(err));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default connectDB;