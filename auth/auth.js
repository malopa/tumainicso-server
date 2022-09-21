var jwt = require('jsonwebtoken');
module.exports = {
    authenticate:async (res,res,next)=>{
        let {token} = req.body

        if(token){
            const decode = jwt.verify(token, process.env.SECRET);
            console.log("decode",decode)
            //  Return response with decode data
            res.json({
                login: true,
                data: decode
            });


            next()
        }
    }
}