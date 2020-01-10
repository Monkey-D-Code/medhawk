module.exports = (sequelize,DataTypes)=>{
    const service = sequelize.define('service',{
        heading : {
            type : DataTypes.STRING,
            unique : true,
            max : 100,
    
        },
        description : {
            type : DataTypes.TEXT,
        },
        imageUrl:{
            type:DataTypes.STRING,
            isUrl : true,
            allowNull : true,
            unique : true,
            notEmpty:false,
        },
    });
    return service;
};