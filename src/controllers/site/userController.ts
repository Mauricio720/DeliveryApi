import e, { Request, Response } from 'express';
import UsersService from '../../services/UsersService';
import validator from 'validator';
import JWT from 'jsonwebtoken';

export const login = async (req: Request, res: Response)=>{
    let array={error:'',token:'',user:{}, address:{}};

    let email=req.body.email as string;
    let password=req.body.password as string;
    
    if(email && password){  
        let validEmail=validator.isEmail(email);
        
        if(validEmail){
            let user=await UsersService.login(email,password,2);
            
            if(user){
                let token=JWT.sign(
                    {id:user.id,email:user.email},
                    process.env.JWT_SECRET_KEY as string
                );    
                array.token=token;
                array.user={
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    profileImg:user.profileImg,
                };
                array.address=await UsersService.getAllAddress(user.id);

            }else{
                array.error='Login e/ou senha estão incorretos';
            }
        }else{
            array.error='Email inválido';
        }
    }else{
        array.error='Email e senha são obrigatório';
    }

    res.json(array);
};

export const addUpdate = async (req: Request, res: Response)=>{
    let id:string=req.body.id as string;
    let name : string=req.body.name as string;
    let email : string=req.body.email as string;
    let password : string=req.body.password as string;
    let profileImg=req.file;
    
    let fileName='default.jpg';
    if(profileImg){
        fileName=await UsersService.uploadFile(profileImg);
    }
    let user=undefined;
    
    if(name && email){
        if(!id){
            user=await UsersService.add(name,email,password,"",2,fileName);
        }else{
            user=await UsersService.update(parseInt(id),name,email,password,"",
            profileImg?fileName:'');
        }
        
        if(user){
            let userResult={
                id:user.id,
                name:user.name,
                email:user.email,
                profileImg:user.profileImg,
            };

            res.json({error:'',user:userResult});
        }else{
            res.json({error:'Algo deu errado!'});
        }
    }else{
        if(!name){
            res.json({error:'Preencha seu nome!'});
        }else if(!email){
            res.json({error:'Preencha seu email!'});
        }
    }
};

export const addAddress= async (req: Request, res: Response)=>{
    let street : string=req.body.street as string;
    let number : string=req.body.number as string;
    let neighborhood : string=req.body.neighborhood as string;
    let city : string=req.body.city as string;
    let state : string=req.body.state as string;
    let cep : string=req.body.cep as string;
    let complement : string=req.body.complement as string;
    let idUser:number=req.body.idUser as number;
    let success=false;
    
    if(street && number && neighborhood && city && state && cep && idUser){
        success=await UsersService.addAddress(
            street,
            number,
            neighborhood,
            city,
            state,
            cep,
            idUser,
            complement
        );

        if(success){
            res.json({error:''});
        }else{
            res.json({error:'Algo deu errado.'});
        }
    }else{
        res.json({error:'Preencha todos os campos obrigatórios.'});
    }
};

export const updateAddress= async (req: Request, res: Response)=>{
    let id : number=req.body.id as number;
    let street : string=req.body.street as string;
    let number : string=req.body.number as string;
    let neighborhood : string=req.body.neighborhood as string;
    let city : string=req.body.city as string;
    let state : string=req.body.state as string;
    let cep : string=req.body.cep as string;
    let complement : string=req.body.complement as string;
    let address=undefined;
    
    if(id){
        address=await UsersService.updateAddress(
            id,
            street,
            number,
            neighborhood,
            city,
            state,
            cep,
            complement
        );

        if(address){
            res.json({error:'',address});
        }else{
            res.json({error:'Algo deu errado.'});
        }
    }else{
        res.json({error:'Preencha todos os campos obrigatórios.'});
    }
}