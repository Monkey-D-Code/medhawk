module.exports = (sequelize,DataTypes)=>{
    const department = sequelize.define('department',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        about:{
            type:DataTypes.TEXT,
            allowNull:false,
            
        },
        imageUrl:{
            type:DataTypes.STRING,
            isUrl:true,
            max:500,
            allowNull:false,
        },
    });
    return department;
}