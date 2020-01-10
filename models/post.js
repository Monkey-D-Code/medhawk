module.exports =(sequelize,DataTypes)=>{
    const post = sequelize.define('post',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            max : 400,
        },
        body : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        cover_image_url : {
            type : DataTypes.STRING,
            allowNull : false,
            
        },
    });
    post.associate = models =>{
        post.belongsTo(
            models.category,
            {foreignKey : 'categoryId', as : 'category'}
        );
        
    }
    return post;
}