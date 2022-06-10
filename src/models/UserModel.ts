import {Model, DataTypes}  from 'sequelize';
import {sequelize} from '../instances/mysql';
import {hashSync} from '../helpers/hashPassword';

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
            let password=hashSync(value);
            this.setDataValue('password',password);
        }
    },

    profileImg:{
        type:DataTypes.STRING,
        defaultValue:'default.jpg',
        get(){
            let value=this.getDataValue('profileImg');
            return `${process.env.BASE_URL}/media/users/${value}`;
        }
    },

    permissions:{
        type:DataTypes.STRING,
    }
},{
    tableName:'users'
})



