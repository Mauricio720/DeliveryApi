import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import { UserModel } from './UserModel';

export interface AddressIntance extends Model{
    id:number,
    street:string,
    number:number,
    neighborhood:string,
    city:string,
    state:string,
    cep:string,
    complement:string,
    id_user:number
}

export const AddressModel=sequelize.define<AddressIntance>('address',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },

    street:{
        type:DataTypes.STRING
    },

    number:{
        type:DataTypes.STRING
    },

    neighborhood:{
        type:DataTypes.STRING
    },

    city:{
        type:DataTypes.STRING
    },

    state:{
        type:DataTypes.STRING,
    },

    cep:{
        type:DataTypes.STRING,
    },

    complement:{
        type:DataTypes.STRING,
    },

    id_user:{
        type:DataTypes.INTEGER,
    }
},{
    tableName:'address'
});

AddressModel.belongsTo(UserModel,{
    constraints:true,
    foreignKey:'id_user'
})