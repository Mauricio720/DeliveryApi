import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import { UserModel } from './UserModel';
import dotenv from 'dotenv';

dotenv.config();

export interface ProductIntance extends Model{
    id:number,
    name:string,
    type:number,
    email:string,
    password:string,
    profileImg:string,
    permissions:string,
}

export const ProductModel=sequelize.define<ProductIntance>('products',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },

    name:{
        type:DataTypes.STRING
    },

    description:{
        type:DataTypes.TEXT
    },

    full_price:{
        type:DataTypes.DECIMAL,
        get(){
            let value=this.getDataValue('full_price');
            return parseFloat(value);
        }
    },

    half_price:{
        type:DataTypes.DECIMAL,
        get(){
            let value=this.getDataValue('half_price');
            return parseFloat(value);
        }
    },

    img:{
        type:DataTypes.STRING,
        defaultValue:'default.jpg',
        get(){
            let value=this.getDataValue('img');
            return `${process.env.BASE_URL}/media/${value}`;
        }
    },

    id_user:{
        type:DataTypes.INTEGER,
    }
},{
    tableName:'products'
});

ProductModel.belongsTo(UserModel,{
    constraints:true,
    foreignKey:'id_user'
})