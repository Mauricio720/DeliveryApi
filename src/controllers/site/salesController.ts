import { Request, Response } from 'express';
import ItemsSaleService from '../../services/ItemsSaleService';
import SalesService from '../../services/SalesService';

type ProductCartItem ={
    idProduct:number;
    quantity:number;
    unity_price:number;
    total_price:number;
}; 

export const add=async (req:Request,res:Response)=>{
    let array={error:'',idSale:0};

    let subtotal:number=req.body.subtotal as number;
    let total:number=req.body.total as number;
    let idUser:number=req.body.idUser as number;
    let idAddress:number=req.body.idAddress as number;
    let observation:string=req.body.observation as string;
    
    if(subtotal && total && idUser){
        let idSale=await SalesService.add(subtotal,total,idUser,observation,idAddress);
        array.idSale=idSale;
    }

    res.json(array);
};

export const addItems=async (req:Request,res:Response)=>{
    let array={error:''};
    try{
        let itemsProducts:ProductCartItem[]=JSON.parse(req.body.itemsProducts);
        let idSale:number=req.body.idSale as number; 
        
        if(itemsProducts.length > 0){
            itemsProducts.forEach(async (item:ProductCartItem)=>{
                await ItemsSaleService.add(item.idProduct,item.unity_price,
                    item.total_price,item.quantity,idSale);
        });
    }

    }catch(error:any){
        res.status(400);
        array.error="Algo deu errado";
    }
    
    res.json(array);
}