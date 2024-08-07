import mongoose from 'mongoose';

export const dbConnection =() =>{
    mongoose.connect(process.env.DB_ONLINE_CONNECTION)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

}
