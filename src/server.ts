import express, { Request, Response,ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRoutes from './routes/mainApi';
import bodyParse from 'body-parser';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(bodyParse.json());

server.get('/ping',(req:Request, res:Response)=>{
    res.json({error:'', ping:true});
});
server.use('/site',mainRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});

server.listen(process.env.PORT);