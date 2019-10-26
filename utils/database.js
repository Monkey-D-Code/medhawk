const Sequelize = require('sequelize');

const sequelize = new Sequelize('medhawk','medhawki','UttamMah@ta1',{
    dialect : 'mysql',
    host : 'localhost',
});

module.exports = sequelize;