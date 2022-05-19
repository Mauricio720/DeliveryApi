import { SalesModel} from "../models/SalesModel"

export default {
    add:async (subtotal:number,total:number,idUser:number,observation:string,idAddress:number)=>{
        let idSale=0;
        try {
            if(subtotal && total && idUser && idAddress){
                let sale= await SalesModel.create({
                    sub_total:subtotal,
                    total,
                    id_user:idUser,
                    observation,
                    id_address:idAddress
                });

                idSale=sale.id;
            }
        } catch (error:any) {
            console.log(error);
        }

        return idSale;
    }
}