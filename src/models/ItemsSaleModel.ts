import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import { SalesModel } from './SalesModel';
import { ProductIntance } from './ProductsModel';

export interface ItemsSaleIntance extends Model{
    id:number,
    id_product:number,
    unit_price:number,
    total_price:number,
    quantity:number,
    id_user:number,
    observation:string,
    id_sale:number,
    product:ProductIntance
}

export const ItemsSaleModel=sequelize.define<ItemsSaleIntance>('products',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },

    id_product:{
        type:DataTypes.INTEGER
    },

    quantity:{
        type:DataTypes.INTEGER
    },

    unit_price:{
        type:DataTypes.DECIMAL,
        get(){
            let value=this.getDataValue('unit_price');
            return parseFloat(value);
        }
    },

    total_price:{
        type:DataTypes.DECIMAL,
        get(){
            let value=this.getDataValue('total_price');
            return parseFloat(value);
        }
    },

    id_sale:{
        type:DataTypes.INTEGER
    },

    observation:{
        type:DataTypes.TEXT
    }
},{
    tableName:'items_sales',
    timestamps:false
});


ItemsSaleModel.belongsTo(SalesModel,{
    foreignKey:'id'
});
