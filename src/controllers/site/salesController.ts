import { Request, Response } from 'express';
import { ItemsSaleIntance } from '../../models/ItemsSaleModel';
import { SalesIntance } from '../../models/SalesModel';
import ItemsSaleService from '../../services/ItemsSaleService';
import SalesService from '../../services/SalesService';

type ProductCartItem ={
    id:number;
    idProduct:number;
    name:string,
    quantity:number;
    unity_price:number;
    total_price:number;
    img:string;
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
};

export const getAllSales=async (req:Request,res:Response)=>{
    let idUser:number=parseInt(req.query.idUser as string);
    let allSales:SalesIntance[]=[];
    
    if(idUser){
        allSales=await SalesService.getByUser(idUser);
    }
    
    res.json({error:'', sales:allSales});
}

export const getSale=async (req:Request,res:Response)=>{
    let idSale:number=parseInt(req.query.idSale as string);
    let sale=undefined;
    
    if(idSale){
        sale=await SalesService.getById(idSale);
    }
    
    res.json({error:'', sale});
}

export const getItemsSales=async (req:Request,res:Response)=>{
    let idSale:number=parseInt(req.query.idSale as string);
    let allItems:ItemsSaleIntance[]=[];
    let newItems:ProductCartItem[]=[];

    if(idSale){
        allItems=await ItemsSaleService.getItemsSale(idSale);
        
        if(allItems){
            allItems.forEach((item)=>{
                let newItem:ProductCartItem={
                    id:item.id,
                    idProduct:item.id_product,
                    name:item.product.name,
                    quantity:item.quantity,
                    unity_price:item.unit_price,
                    total_price:item.total_price,
                    img:item.product.img
                }
                newItems.push(newItem);
            })
        }
    }
    console.log(newItems);
    
    res.json({error:'', itemsSale:newItems});
}

