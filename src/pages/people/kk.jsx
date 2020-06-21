//处理文件上传的路由

const multer =require("multer")
const path =require('path')
const fs =require('fs')


const dirPath = path.join(__dirname,'..','public/upload')


const storage = multer.diskStorage({
    //destination:文件储存路径  string是服务器启动将会自动创建文件夹
    destination:function (req,file,cb){
        if(!fs.existsSync(dirPath)){        //同步的方法检测目录是否存在
            fs.mkdir(dirPath,function (err) {  //异步的方式创建文件目录，存在就报错
                if(err){
                    console.log(err)
                }else{
                    cb(null,dirPath)
                }
            })
        }else{
            cb(null,dirPath)
        }
    },
    filename:(req,file,cb)=>{
        var ext =path.extname(file.originalname)
        cb(null,file.fieldname+'-'+Date.now()+ext)
    }
})

const upload = multer({storage})
const uploadSingle = upload.single("image")

module.exports = function fileUpload(router){
    //上传图片
    router.post("/admin/img/upload",(req,res)=>{
        uploadSingle(req,res,function(err){
            if(err){
                return res.send({
                    status:1,
                    mag:'上传文件失败',
                    err
                })
            }
            var file =req.file
            res.send({
                status:0,
                data:{
                    name:file.filename,
                    url:"http://10.3.135.6:5000/public/upload/"+file.filename
                }
            })
        })
    })


    //删除图片
    router.post('/admin/img/delete',(req,res)=>{
        const {name}=req.body
        fs.unlink(path.join(dirPath,name),(err)=>{
            if(err){
                console.log(err)
                res.send({
                    status:1,
                    msg:'删除文件失败'
                })
            }else{
                res.send({
                    status:0
                })
            }
        })
    })
}