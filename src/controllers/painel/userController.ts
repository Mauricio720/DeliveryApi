import { Request, Response } from 'express';
import UsersService from '../../services/UsersService';
import validator from 'validator';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const index=async (req: Request, res: Response)=>{
    let users=await UsersService.getAll();
    res.render('resources/painel/users/allUsers',{
        users
    });
}

export const loginView = async (req: Request, res: Response)=>{
    let error:string=req.query.error as string;
    
    res.render('resources/painel/login',{
        error
    });
};

export const login = async (req: Request, res: Response)=>{
    let email=req.body.email as string;
    let password=req.body.password as string;

    if(email && password){  
        let validEmail=validator.isEmail(email);

        if(validEmail){
            let user=await UsersService.login(email,password);
            
            if(user){
                let token=JWT.sign(
                    {id:user.id,email:user.email},
                    process.env.JWT_SECRET_KEY as string
                );    
                
                //localStorage.setItem('token',token);
                res.redirect('/painel');
            }else{
                res.redirect(`/painel/login?error=Login e/ou senha estão incorretos`);
            }
        }
    }
};

let type
export const addUpdateView=async (req: Request, res: Response)=>{
    let id=req.params.id as string;
    let showFormAdd=true;
    let showFormUpdate=false;

    let user=undefined;
    if(id){
        user=await UsersService.getById(parseInt(id));
        showFormAdd=false;
        showFormUpdate=true;
    }

    res.render('resources/painel/users/addUser',{
        user,
        showFormUpdate,
        showFormAdd
    });
}

export const addUpdate=async (req: Request, res: Response)=>{
    let id:number=req.body.id as number;
    let name : string=req.body.name as string;
    let email : string=req.body.email as string;
    let password : string=req.body.password as string;
    let permissions : string=req.body.permissions as string;
    let success=false;
    
    if(!id){
        success=await UsersService.add(name,email,'[1]');
    }else{
        success=await UsersService.update(id,name,email,password,permissions);
    }
    
    if(success){
        res.redirect('/painel/users');
    }
}

export const deleteUser=async (req: Request, res: Response)=>{
    let id=req.params.id as string;
    
    if(id){
       await UsersService.delete(parseInt(id));
    }

    res.redirect('/painel/users');
}