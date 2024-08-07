import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim: true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    phone:String,
    role:{
        type:String,
        enums: ["Admin" , "User"],
        default: "User"

    },
    password:{
        type:String,
        required:true,

    },
    changePasswordAt:Date,
    wishList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    }],
    isActive:{
        type: Boolean,
        default: true
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    isVerfied:{
        type: Boolean,
        default: false
    },

    

},{
    timestamps: true
})

schema.pre("save", function(){
    console.log(this); //document el object elli ha save f el DB
    this.password = "bl7"
    this.password = bcrypt.hashSync(this.password, 7)
    
})

// schema.pre("findOneAndUpdate", function(){
//     console.log(this); // hytb3 l query bta3t l DB kolaha
//     // this.password = "bl7"
//     this._update.password = bcrypt.hashSync(this._update.password,7)
//     // this.password = bcrypt.hashSync(this.password, 7)
    
// })


schema.pre("findOneAndUpdate", async function(next) {
    const update = this.getUpdate();
    if (update.password) {
      update.password = await bcrypt.hash(update.password, parseInt(process.env.SALT_ROUNDS));
    }
    next();

});

schema.post("save", function(){
    console.log(this);
})



const userModel = mongoose.model("User", schema);
export default userModel;