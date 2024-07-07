const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'photo'));
    },
    filename: (req, file, cb) => {


        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
       
    }
});

const upload = multer({ storage: storage ,fileFilter:(req,file,cb)=>{
    if(file.mimetype=='image/png'||file.mimetype=='image/jpg'||file.mimetype=='image/jpeg'){
        cb(null,true)
    }else{ cb(new multer.MulterError('no a picture'))}
}});
module.exports = upload;
