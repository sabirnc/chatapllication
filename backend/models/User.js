const {Schema , model} = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

// static signup method
userSchema.statics.signup = async function(username , password){

    //valitdation
    if(!username || !password){
        throw Error("All fields must be filled")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("password is not strong enough")
    }


    const exists = await this.findOne({username})

    if(exists){
        throw Error("username already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({username , password:hash})

    return user

}

// static login method
userSchema.statics.login = async function(username , password) {

    //validation
    if(!username || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({username})

    if(!user){
        throw Error("incorrect username")
    }

    const match = await bcrypt.compare(password , user.password)

    if(!match){
        throw Error("incorrect password")
    }

    return user
}

const User = model("user", userSchema)
module.exports = User