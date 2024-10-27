import path from 'path';
import express from 'express'
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        console.log("filex ",file);
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkfileType(file,cb){
    const filetype= /jpg|jpeg|png/;
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetype.test(file.mimetype);
    if(extname && mimetype){
        return cb(null,true);

    }else{
        cb("Images only")
    }
}

const upload = multer({
    storage,
    fileFilter: (req,file,cb) => checkfileType(file,cb)
})

router.post('/', upload.single('image'), (req,res)=>{
    const imagepath = req.file.path.replace(/\\/g, "/")
    console.log("img path", imagepath)
    console.log("fil  ",req.file)
    res.send({msg : 'Image uploaded',
        image: `http://localhost:8000/${imagepath}`
    })
});

export default router;