module.exports = (sequelize,DataTypes)=>{
    const category = sequelize.define('category',{
        name : DataTypes.STRING,
        image_url : DataTypes.STRING,
        description : DataTypes.TEXT,
    });
    category.associate = models => {
        category.hasMany(
            models.post,
            {as : 'posts'}
        )
    }
    return category;
}