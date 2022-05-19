import { Op } from "sequelize";
import { ProductIntance, ProductModel } from "../models/ProductsModel";

export default {
    getAll:async (name?:string)=>{
        try {
            let products:ProductIntance[]=[];
            if(name){
                products= await ProductModel.findAll({
                    where:{
                        name:{
                            [Op.like]:'%'+name+'%'
                        }
                    }
                });
            }else{
                products= await ProductModel.findAll();
            }
           
            return products;
        
        } catch (error:any) {
            console.log(error);
        }
    }
}