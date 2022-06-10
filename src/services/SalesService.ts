import { AddressModel } from "../models/AddressModel";
import { SalesIntance, SalesModel} from "../models/SalesModel"

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
    },

    getByUser:async (idUser:number)=>{
        let allSales:SalesIntance[]=[];
        try {
            allSales=await SalesModel.findAll({where:{id_user:idUser}});
        } catch (error:any) {
            console.log(error);
        }

        return allSales;
    },

    getById:async (idSale:number)=>{
        let sale=undefined;

        try {
            sale=await SalesModel.findOne({
                where:{id:idSale},
                include: [{
                    model: AddressModel,
                    required: true,
                    nested: true 
                }]
            }) ;
        } catch (error:any) {
            console.log(error);
        }

        return sale;
    }
};

