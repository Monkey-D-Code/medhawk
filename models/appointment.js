
module.exports = (sequelize , DataTypes)=>{
    const appointment = sequelize.define('appointment',{
        fullName :{
            type:DataTypes.STRING,
        },
        email:DataTypes.STRING,
        phoneNumber : DataTypes.INTEGER,
        problem:DataTypes.TEXT,
        address :DataTypes.TEXT,
    })
    return appointment;
};