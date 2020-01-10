module.exports = (sequelize,DataTypes)=>{
    const doctor = sequelize.define('doctor',{
        name : {
            type :DataTypes.STRING,
            allowNull:false,
        },
        role :{
            type:DataTypes.STRING,
            allowNull:false,
        },
        imageUrl:{
            type : DataTypes.STRING,
            allowNull:false,
            isUrl:true,
        },
        facebookLink:{
            type : DataTypes.STRING,
            allowNull:false,
            isUrl:true,
        },
        twitterLink:{
            type : DataTypes.STRING,
            allowNull:false,
            isUrl:true,
        },
        instagramLink:{
            type : DataTypes.STRING,
            allowNull:false,
            isUrl:true,
        },
    });
    return doctor;
};