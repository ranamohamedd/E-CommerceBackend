import { handleError } from "../../middleware/handleError.js"


export const deleteOne = (model) => {
   return handleError(
    async (req,res) =>{
        let deleted = await model.findByIdAndDelete(req.params.id)
        console.log(deleted)
        deleted&& res.json({message:"Deleted", deleted})
        !deleted&& res.json({message:"Not Found"})
    }
   )
}