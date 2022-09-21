const news = require("../models/news");

module.exports = {
    getNews:async (req,res)=>{
        const data = await news.find();
        return res.status(200).json(data)
    },
    postNews:async (req,res)=>{

        try{
            const _news =new news({...req.body})
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