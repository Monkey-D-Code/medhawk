const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Brand = sequelize.define("brand",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    fullName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    shortName :{
        type : Sequelize.STRING,
        allowNull:true,
    },
    contactNumber :{
        type : Sequelize.BIGINT,
        
    },
    email:{
        type : Sequelize.STRING,
        
        allowNull:false,
    },
    address:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    
    openHours:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    facebookLink:{
        type:Sequelize.STRING,
        allowNull:true,
        isUrl:true
    },
    twitterLink:{
        type:Sequelize.STRING,
        allowNull:true,
        isUrl:true
    },
    instagramLink:{
        type:Sequelize.STRING,
        allowNull:true,
        isUrl:true
    },
},{timestamps:false});

module.exports = Brand;