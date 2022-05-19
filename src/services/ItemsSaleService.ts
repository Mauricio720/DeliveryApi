import { ItemsSaleModel } from "../models/ItemsSaleModel";

export default {
    add:async(idProduct:number,unitPrice:number,totalPrice:number,quantity:number,idSale:number)=>{
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
    }
}