module.exports = (sequelize,DataTypes)=>{
    const brand = sequelize.define('brand',{
        fullName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        shortName :{
            type : DataTypes.STRING,
            allowNull:true,
        },
        contactNumber :{
            type : DataTypes.BIGINT,
            
        },
        email:{
            type : DataTypes.STRING,
            
            allowNull:false,
        },
        address:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        
        openHours:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        facebookLink:{
            type:DataTypes.STRING,
            allowNull:true,
            isUrl:true
        },
        twitterLink:{
            type:DataTypes.STRING,
            allowNull:true,
            isUrl:true
        },
        instagramLink:{
            type:DataTypes.STRING,
            allowNull:true,
            isUrl:true
        },
    });
    return brand;
};