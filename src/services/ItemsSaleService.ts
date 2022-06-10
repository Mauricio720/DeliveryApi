import { ItemsSaleIntance, ItemsSaleModel } from "../models/ItemsSaleModel";
import { ProductModel } from "../models/ProductsModel";

export default {
    add:async (idProduct:number,unitPrice:number,totalPrice:number,quantity:number,idSale:number)=>{
        let success=false;
        try {
            await ItemsSaleModel.create({
                id_product:idProduct,
                unit_price:unitPrice,
                total_price:totalPrice,
                quantity,
                id_sale:idSale
            });

            success=true;
        } catch (error:any) {
            console.log(error);
        }

        return success;
    },

    getItemsSale: async (idSale:number)=>{
        let itemSales:ItemsSaleIntance[]=[];
        
        try {
            itemSales=await ItemsSaleModel.findAll({
                where: {id_sale: idSale},
                include: [{
                    model: ProductModel,
                    required: true,
                    nested: true 
                }]
            });
        } catch (error:any) {
            console.log(error);
        }

        return itemSales;
    }
}
