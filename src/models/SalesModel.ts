import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import { AddressModel } from './AddressModel';
import { UserModel } from './UserModel';

export interface SalesIntance extends Model{
    id:number,
    subtotal:number,
    total:number,
    id_user:number,
    observation:string,
    id_address:number,
}

export const SalesModel=sequelize.define<SalesIntance>('products',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },

    sub_total:{
        type:DataTypes.DECIMAL
    },

    total:{
        type:DataTypes.DECIMAL
    },

    observation:{
        type:DataTypes.STRING,
    },

    id_address:{
        type:DataTypes.INTEGER,
    },

    id_user:{
        type:DataTypes.INTEGER,
    },

},{
    tableName:'sales'
});

SalesModel.belongsTo(UserModel,{
    constraints:true,
    foreignKey:'id_user'
});

SalesModel.belongsTo(AddressModel,{
    constraints:true,
    foreignKey:'id_selected_addres'
});