import { Schema } from "mongoose"; 


export default (schema: Schema) => {
    schema.set('toJSON',{transform: function(doc, ret, options) {

        ret.id = ret._id 
        delete ret._id 
        delete ret.__v 
        
        //remove field private 
        for(const path in doc.schema.paths){
            if(doc.schema.paths[path].options.private){
                delete ret[path]
            }
        }
        return ret 
    }}) 

   
}