module.exports = (sequelize,DataTypes)=>{
    const message = sequelize.define('message',{
        name : {
            type : DataTypes.STRING,
            allowNull:false,
        },
        email : {
            type : DataTypes.STRING,
            isEmail : true,
            allowNull:false,
        },
        subject:{
            type : DataTypes.STRING,
            allowNull:false,
        },
        message : {
            type:DataTypes.TEXT,
            allowNull:false,
        },
    });
    return message;
};