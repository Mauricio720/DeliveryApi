import {Router,Request,Response} from 'express';
import * as UserController from '../controllers/site/userController';
import * as ProductController from '../controllers/site/productsController';
import * as SalesController from '../controllers/site/salesController';

const router= Router();

router.post('/add_user',UserController.addUpdate);
router.post('/add_address',UserController.addAddress);

router.post('/login',UserController.login);
router.get('/products',ProductController.getAll);

router.post('/add_sale',SalesController.add);
router.post('/add_sale_item',SalesController.addItems);

export default router;