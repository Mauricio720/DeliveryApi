import {UserModel} from '../models/UserModel';
import {hashCompare,hash} from '../helpers/hashPassword';
import { AddressModel } from '../models/AddressModel';

export default {
    getAll: async ()=>{
        try{
            let users=await UserModel.findAll();
            return users;
        
        }catch(error:any){
            console.log(error);
        }
    },

    getById:async (id:number)=>{
        try{
            let user=await UserModel.findByPk(id);
            return user;
        
        }catch(error:any){
            console.log(error);
        }
    },

    login: async(email:string,password:string)=>{
        let userResult=undefined;
        
        try{
            let user=await UserModel.findOne({where:{email}});
            if(user){
                let responsePass=await hashCompare(password,user.password)
                if(responsePass){
                    userResult=user;
                }
            }
            
        }catch(error:any){
            console.log(error);
        }

        return userResult;
    },

    add: async (name:string,email:string,permissions:string) => {
        let success=false;
        try {
            UserModel.create({
                name,
                email,
                permissions,
                type:1,
            });
            success=true;

        } catch (error:any) {
            console.log(error);
        }

        return success;
    },

    update: async (id:number,name:string='',email:string='',pass:string='',permissions:string='')=>{
        let success=false;
        try {
            let user=await UserModel.findByPk(id);
            
            if(user){
                user.name=name!==''?name:user.name;
                user.email=email!==''?email:user.email;
                user.password=pass?pass:user.password;    
                user.permissions=permissions?permissions:user.permissions;
                user.save();

                success=true;
            }
            

        } catch (error:any) {
            console.log(error);
        }

        return success;
    },

    delete:async (id:number) => {
        let success=false;

        try {
             let user=await UserModel.findByPk(id);
             if(user){
                await UserModel.destroy({where:{id}});
                success=true;
             }
        } catch (error:any) {
            console.log(error);
        }

        return success;
    },

    addAddress:async (street:string,number:string,neighborhood:string,city:string,
            state:string,cep:string,idUser:number,complement?:string)=>{
        
        let success=false;
        
        try {
            AddressModel.create({
                street,
                number,
                neighborhood,
                city,
                state,
                cep,
                complement,
                id_user:idUser
            });

            success=true;

        } catch (error:any) {
            console.log(error);
        }

        return success;
    }
    
}


