const Sequeliz = require('sequelize');
const sequelize = require('../utils/database');


const Department = sequelize.define('department',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement  :true,
        allowNull : false,
        primaryKey : true,
    },
});

module.exports = Department;