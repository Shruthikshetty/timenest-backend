/**
 * This file contains all the upload related routes
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import upload from '../commons/utils/multer.config';
import '../commons/utils/cloudinary.config';
import { uploadImage } from '../controllers/upload.controller';

//initializer router
const router = Router();

// Route to upload image
router.post('/image', requireUser, upload.single('image'), uploadImage);

// export clubbed routes
export default router;
