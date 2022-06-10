import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import dotenv from 'dotenv';
import { ItemsSaleModel } from './ItemsSaleModel';

dotenv.config();

export interface ProductIntance extends Model{
    id:number,
    name:string,
    description:number,
    full_price:number,
    half_price:number,
    img:string,
    id_user:string,
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
            return `${process.env.BASE_URL}/media/pizzas/${value}`;
        }
    },

    id_user:{
        type:DataTypes.INTEGER,
    }
},{
    tableName:'products'
});

ProductModel.hasMany(ItemsSaleModel,{
    foreignKey:'id_product'
})