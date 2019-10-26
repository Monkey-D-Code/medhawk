const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Department = sequelize.define('department',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    about:{
        type:Sequelize.TEXT,
        allowNull:false,
        
    },
    imageUrl:{
        type:Sequelize.STRING,
        isUrl:true,
        max:500,
        allowNull:false,
    },

},{timestamps:false});

module.exports = Department;