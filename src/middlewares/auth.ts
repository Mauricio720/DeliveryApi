import {Request, Response, NextFunction} from 'express';

export const Auth={
    privatePainel: (req: Request, res:Response, next:NextFunction)=>{
        let success=true;

        if(success){
            next();
        }else{
            res.redirect('/painel/login');
        }
    },

    privateSite: (req: Request, res:Response, next:NextFunction)=>{
        let success=false;

        if(success){
            next();
        }else{
            res.redirect('/login');
        }
    },
}