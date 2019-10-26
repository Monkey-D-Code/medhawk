const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Doctor = sequelize.define("doctor",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    name : {
        type :Sequelize.STRING,
        allowNull:false,
    },
    role :{
        type:Sequelize.STRING,
        allowNull:false,
    },
    imageUrl:{
        type : Sequelize.STRING,
        allowNull:false,
        isUrl:true,
    },
    facebookLink:{
        type : Sequelize.STRING,
        allowNull:false,
        isUrl:true,
    },
    twitterLink:{
        type : Sequelize.STRING,
        allowNull:false,
        isUrl:true,
    },
    instagramLink:{
        type : Sequelize.STRING,
        allowNull:false,
        isUrl:true,
    },
},{timestamps:false});

module.exports = Doctor;