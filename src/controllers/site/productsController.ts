import { Request, Response } from 'express';
import { ProductIntance } from '../../models/ProductsModel';
import ProductsService from '../../services/ProductsService';

export const getAll = async (req: Request, res: Response)=>{
   let products:ProductIntance[]=[];
   let name:string=req.query.name as string;
   
   if(name){
        products=await ProductsService.getAll(name) as ProductIntance[];
   }else{
        products=await ProductsService.getAll() as ProductIntance[];
   }
   
    res.json(products);
};