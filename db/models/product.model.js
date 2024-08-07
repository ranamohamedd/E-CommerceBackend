import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        minLength: [3 , "Title is too short"],
        maxLength : [30 , "Title is too long"],
        trim: true,
        unique: true
    },
    slug:{
        type:String,
        required: true,
        lowercase: true
    },
    description:{
        type:String,
        minLength: [3 , "Title is too short"],
        maxLength : [300 , "Title is too long"],
        required: true
        
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true
    },
    
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    imageCover: String,
    images: [String],
    sold:{
        type:Number,
        required:true,
        default: 0,
    },
    quantity:{
        type:Number,
        required:true,
        default: 1,
    },
    rateCount: Number,
    rateAvrg:{
        type: Number,
        min:0,
        max:5

    },
    subcategory:{
        type: mongoose.Types.ObjectId,
        ref: "subCategory"
    },
    brand:{
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}
})

schema.post("init", function(doc){
    doc.imageCover = process.env.BASEURL + 'uploads/' + doc.imageCover;
    if(doc.images) doc.images = doc.images.map(ele =>process.env.BASEURL + 'uploads/' + ele ) ;


})

schema.virtual("myReviews",{
    ref:"Reviews",
    localField:"_id",
    foreignField:"product",
    justOne:true
})

schema.pre(/^find/, function(){
    this.populate("myReviews")
})

const productdModel = mongoose.model("Product", schema);
export default productdModel