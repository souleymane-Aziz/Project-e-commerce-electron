let mongoose=require('mongoose')
let RoleSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true,
        unique:true
    },

})

const RoleModel = mongoose.model('role',RoleSchema);

module.exports = RoleModel;