const news = require("../models/news");
const AWS = require('aws-sdk')

module.exports = {
    getNews:async (req,res)=>{
        const data = await news.find().limit(3);
        return res.status(200).json(data)
    },
    postNews:async (req,res)=>{

        try{
            console.log(req.files)

            let files = req.files;
            console.log(files)
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
              })
    
              
            const uploadedImage = await s3.upload({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: files[0].originalname,
                Body: files[0].buffer,
              }).promise()
    
    
            const obj = {
                ...req.body,
                pdf_url:uploadedImage.Location,
            }

            const _news =new news(obj)
            const data =await  _news.save();
            return res.status(200).json({status:true,data})
        }catch(err){
            return res.status(400).json({status:false,msg:`Failed to post data ${err}`})
        }
    },
    
    deleteNews:async (req,res)=>{
        let {id} = req.params
        let data = await news.findByIdAndDelete(id)
        res.status(200).json({status:true,data})
    }
}