import {Router,Request,Response} from 'express';
import * as UserController from '../controllers/site/userController';
import * as ProductController from '../controllers/site/productsController';
import * as SalesController from '../controllers/site/salesController';
import multer from 'multer';
import { Auth } from '../middlewares/auth';


const upload=multer({
    dest:'./tmp',
    fileFilter:(req,file,cb)=>{
        const allowed:string[]=['image/jpg','image/jpeg','image/png'];
        cb(null,allowed.includes(file.mimetype));
    }
})

const router= Router();

router.post('/add_user',upload.single('profileImg'),UserController.addUpdate);
router.post('/update_user',Auth.privateSite,upload.single('profileImg'),UserController.addUpdate);
router.post('/add_address',Auth.privateSite,UserController.addAddress);
router.post('/update_address',Auth.privateSite,UserController.updateAddress);

router.post('/login',UserController.login);
router.get('/products',ProductController.getAll);

router.post('/add_sale',Auth.privateSite,SalesController.add);
router.post('/add_sale_item',Auth.privateSite,SalesController.addItems);
router.get('/get_sales',Auth.privateSite,SalesController.getAllSales);
router.get('/get_sale',Auth.privateSite,SalesController.getSale);
router.get('/get_items_sale',Auth.privateSite,SalesController.getItemsSales);


export default router;