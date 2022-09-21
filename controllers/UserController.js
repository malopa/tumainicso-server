var jwt = require('jsonwebtoken');
const User = require("../models/User");

module.exports = {
    addUser:async (req,res)=>{
        console.log(req.body)
        let user =new User({...req.body})
        let result = await user.save();
        return res.status(201).json(result)
    },
    login:async (req,res)=>{
        let {username,password} = req.body;
        console.log("credential",req.body)
        let data = await User.find({username:username,password:password})

        let token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: data
         }, process.env.SECRET);

        if(data.length > 0)return res.status(200).json({status:true,token:token});
        
        return res.status(200).json({status:false,msg:"wrong username/password"});
    },
    deleteUser:async (req,res)=>{
        res.status(200).json({msg:"hello delete"})
    },
    getUsers:async (req,res)=>{
        let data  = await User.find({})
        return res.status(200).json(data)
        
    }
}