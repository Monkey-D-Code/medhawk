const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Message = sequelize.define("message",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    name : {
        type : Sequelize.STRING,
        allowNull:false,
    },
    email : {
        type : Sequelize.STRING,
        isEmail : true,
        allowNull:false,
    },
    subject:{
        type : Sequelize.STRING,
        allowNull:false,
    },
    message : {
        type:Sequelize.TEXT,
        allowNull:false,
    },
    createdAt : Sequelize.DATE,
    updatedAt : Sequelize.DATE,
    creationDate : Sequelize.DATE,
})

module.exports = Message;