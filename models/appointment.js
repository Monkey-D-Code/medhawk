const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Appointment = sequelize.define("appointment",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
    fullName :{
        type:Sequelize.STRING,
    },
    email:Sequelize.STRING,
    phoneNumber : Sequelize.INTEGER,
    problem:Sequelize.TEXT,
    address :Sequelize.TEXT,
    createdAt : Sequelize.TIME,
    updatedAt:Sequelize.TIME,
    creationDate : Sequelize.DATE,
})

module.exports = Appointment;