import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }

});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Unsupported Filetype", false));
    }
}

const upload = multer({storage, fileFilter});
const uploadSingle = upload.single('image');

router.post('/', (req, res) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            res.status(400).send({message: err.message});
        } else if (req.file) {
            res.status(200).send({
                message: "File upload successful",
                image: `/${req.file.path}`,
            })
        } else {
            res.status(400).send({message: "File upload failed"});
        }
    })
});

export default router;