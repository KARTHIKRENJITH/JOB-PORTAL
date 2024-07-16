const User = require('../Models/UserSchema');
const bcrypt = require('bcryptjs');




const getAll = async(req,res)=>{
    try{
        const Logied = await User.find({})
    res.status(200).json({msg:"All Users 😉😉😉😉😉😉",Logied})
    }catch(error){
    res.status(500).json({msg:"Something Went wrong 😬😬"})
    }
}


const SignUp = async(req,res)=>{
    let exsitingUSer;
    const { name,email,password,phone }= req.body;
        exsitingUSer = await User.findOne({email:email});
        if(exsitingUSer){
        return res.status(400).json("User Already Exist 😶😶😶")
}
   const ciperText = bcrypt.hashSync(password,10) ;

   let result = await User.create({
    name:name,
    email:email,
    password:ciperText,
    phone:phone
})
 res.status(200).json({
    msg:"USER CREATED SUCCESSFULLY !!! 👍👍👍👍👍👍",
    sucess:true
   });
}

const Login = async(req,res)=>{
    const {email,password} = req.body;
    const exsitingUSer = await User.findOne({email:email});
    if(!exsitingUSer){
        return res.status(400).json("User Not Found 😶😶😶")
    }
    const ciperText = exsitingUSer.password;
    const match = bcrypt.compareSync(password,ciperText);
    if(!match){
        return res.status(400).json("Wrong Password 😶😶😶")
    }
    res.status(200).json({
        msg:"LOGIN SUCCESSFULLY !!! 👍👍👍👍👍👍",  
        sucess:true
       });
       console.log("Email : ",email);
       console.log("Password : ",password);
}


const Logout = async(req,res)=>{
    res.clearCookie("token").status(200).json({
        msg:"LOGOUT SUCCESSFULLY !!! 👍👍👍👍👍👍",
        sucess:true
       });
}


module.exports = {
    SignUp,
    getAll,
    Login,
    Logout,
};