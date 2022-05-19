import { STRING } from 'sequelize';
import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';

export interface UserIntance extends Model{
    id:number,
    name:string,
    type:number,
    email:string,
    password:string,
    profileImg:string,
    permissions:string,
}

export const UserModel=sequelize.define<UserIntance>('users',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },

    name:{
        type:DataTypes.STRING
    },

    type:{
        type:DataTypes.INTEGER
    },

    email:{
        type:DataTypes.STRING
    },

    password:{
        type:DataTypes.STRING,
        set(value:string){
            this.setDataValue('password','1234');
        }
    },

    profileImg:{
        type:DataTypes.STRING,
        defaultValue:'default.jpg'
    },

    permissions:{
        type:DataTypes.STRING,
    }
},{
    tableName:'users'
})