import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import { SalesModel } from './SalesModel';
import { ProductModel } from './ProductsModel';

export interface ItemsSaleIntance extends Model{
    id:number,
    subtotal:number,
    total:number,
    id_user:number,
    observation:string,
    id_sale:number
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

    number:{
        type:DataTypes.INTEGER
    },

    unit_price:{
        type:DataTypes.DECIMAL
    },

    total_price:{
        type:DataTypes.DECIMAL
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

ItemsSaleModel.belongsTo(ProductModel,{
    constraints:true,
    foreignKey:'id_products'
});

ItemsSaleModel.belongsTo(SalesModel,{
    constraints:true,
    foreignKey:'id_sale'
});