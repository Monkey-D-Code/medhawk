const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Service = sequelize.define('service',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    heading : {
        type : Sequelize.STRING,
        unique : true,
        max : 100,

    },
    description : {
        type : Sequelize.TEXT,
    },
    imageUrl:{
        type:Sequelize.STRING,
        isUrl : true,
        allowNull : true,
        unique : true,
        notEmpty:false,
    }
    
});

module.exports = Service;