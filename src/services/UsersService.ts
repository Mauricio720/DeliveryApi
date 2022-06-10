import {UserIntance, UserModel} from '../models/UserModel';
import {hashCompare,hash} from '../helpers/hashPassword';
import { AddressIntance, AddressModel } from '../models/AddressModel';
import sharp from 'sharp';
import { unlink } from 'fs/promises';


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

    login: async(email:string,password:string,type:number)=>{
        let userResult=undefined;
        
        try{
            let user=await UserModel.findOne({where:{email,type}});
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

    add: async (name:string,email:string,password:string,permissions:string,
            type:number,profileImg?:string) => {
        let user=undefined;
        
        try {
            user=await UserModel.create({
                name,
                email,
                password,
                permissions,
                type,
                profileImg
            });
            
        } catch (error:any) {
            console.log(error);
        }

        return user;
    },

    update: async (id:number,name:string='',email:string='',pass:string=''
        ,permissions:string='',profileImg?:string)=>{
        let user=undefined;
        try {
            user=await UserModel.findByPk(id);
            
            if(user){
                user.name=name!==''?name:user.name;
                user.email=email!==''?email:user.email;
                if(pass!==''){
                    user.password=user.password;    
                }
                user.permissions=permissions?permissions:user.permissions;
                if(profileImg){
                    verifyAndDeleteOldFile(user,profileImg);
                    user.profileImg=profileImg;
                }
                
                
                user.save();
            }
            

        } catch (error:any) {
            console.log(error);
        }

        return user;
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

    uploadFile:async(file:Express.Multer.File)=>{
        if(file){
            await sharp(file.path)
            .toFormat('jpeg')
            .toFile(`./public/media/users/${file.filename}.jpg`);

            await unlink(file.path);
            
            return `${file.filename}.jpg`;
        }else{
            return 'default.jpg';
        }
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
    },

    updateAddress:async (id:number,street?:string,number?:string,neighborhood?:string,city?:string,
        state?:string,cep?:string,complement?:string)=>{
    
    let address=undefined;
    
    try {
        let addressModel=await AddressModel.findByPk(id);

        if(addressModel){
            addressModel.street=street?street:addressModel.street;
            addressModel.number=number?number:addressModel.number;
            addressModel.neighborhood=neighborhood?neighborhood:addressModel.neighborhood;
            addressModel.city=city?city:addressModel.city;
            addressModel.state=state?state:addressModel.state;
            addressModel.cep=cep?cep:addressModel.cep;
            addressModel.complement=complement?complement:addressModel.complement;
            addressModel.save();

            address=await AddressModel.findAll({where:{id_user:addressModel.id_user}});
        }
       
        } catch (error:any) {
            console.log(error);
        }

        return address;
    },

    getAllAddress:async (idUser:number)=>{
        let allAddress:AddressIntance[]=[];
        try {
            allAddress=await AddressModel.findAll({where:{id_user:idUser}}); 
        } catch (error:any) {
            console.log(error);
        }

        return allAddress;
    }
    
}

const verifyAndDeleteOldFile=(user:UserIntance,profileFile:string)=>{
    let profileImg=user.profileImg.split('/')[5];
    
    if(profileImg !== profileFile && profileImg !== "default.jpg"){
        unlink('public/media/users/'+profileImg);
    }
}


