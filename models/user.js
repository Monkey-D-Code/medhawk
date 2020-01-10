module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define('user',{
        firstName : {
            type : DataTypes.STRING,
            max : 40,
            allowNull : false,
    
        },
        middleName : {
            type : DataTypes.STRING,
            max:40,
            allowNull : true,
        },
        lastName :{
            type : DataTypes.STRING,
            max:40,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            isEmail:true,
            allowNull:false,
            max : 100,
            unique:true,
        },
        contactNumber : {
            type:DataTypes.INTEGER,
            max:10,
            min:10,
        },
        displayImageUrl : {
            type : DataTypes.STRING,
            isUrl : true,
            max : 500,
            allowNull:true,
        },
        password : {
            type : DataTypes.STRING,
            min : 8,
            max: 30,
            allowNull:false,
        },
    });
    return user;
};