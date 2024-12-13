import multer from 'multer';
import path from 'path';
import { generateID } from '../helpers/tokens.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/imagenPerfil"); // Ruta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
