const Events = require("../models/events")
const Resize = require("../utils/resize");
const AWS = require('aws-sdk')
const sharp = require("sharp");
require('dotenv').config();


var fs = require('fs');
var path = require('path');


module.exports = {
    postEvent:async (req,res)=>{

        // const imagePath = path.join(__dirname, '../public/uploads');
        // const fileUpload = new Resize(imagePath);
    // console.log("data  to sub ",req.file)
        
    if (!req.file) {
        return res.status(401).json({status:401,error: 'Please provide an image'});
        }
        const filename =req.file.originalname;// await fileUpload.save(req.file.buffer);


        // console.log('blob',req.file.originalname)
        const blob1 = sharp(req.file.buffer)
        .resize({
            width: 400,
            height: 300
        });
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
          })

          
        const uploadedImage = await s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: filename,
            Body: blob1,
          }).promise()

          console.log("images ",uploadedImage.Location)

        const obj = {
            image:uploadedImage.Location,
            description:req.body.description
        }

        try{
            const data =  await Events.create(obj)
            return res.status(201).json({status:true,data:data})

        }catch(err){
            return res.status(401).json({status:false,msg:`Failed to post ${err}`})
        }

    },

    deleteEvent:async (req,res)=>{
        let {id} = req.params;
        const data = await Events.findByIdAndDelete(id)
        return res.status(200).json({status:true,data})
    },

    getEvent:async (req,res)=>{
        const data = await Events.find()
        return res.status(200).json(data)
    }
}