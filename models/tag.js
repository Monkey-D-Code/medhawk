module.exports = (sequelize,DataTypes)=>{
    const tag = sequelize.define('tag',{
        keyword : DataTypes.STRING,
        description : DataTypes.TEXT,
    });
    return tag;
}