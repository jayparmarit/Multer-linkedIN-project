import multer from "multer";
import path from "path"

import HttpError from "./HttpError.js";

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads");
    },
    filename:(req, file, cb)=>{
        const uniqueName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// file type validation

const fileFilter = (req,file,cb)=>{
    const allowedFileType = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heic",
        "application/pdf",
        "video/mp4"
    ];
    if (!allowedFileType.includes(file.mimetype)) {
    return cb(new HttpError("invalid file type", 400), false);
  }

  cb(null, true);
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;