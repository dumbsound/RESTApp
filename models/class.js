module.exports=(sequelize, DataTypes)=>{
    const Class=sequelize.define('Class',{
        classCode:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                notEmpty: true
              }
        },
        className:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
              }
        }
    });

    Class.associate=models=>{
        models.Class.belongsToMany(models.Teacher,{
            through: models.class_Teacher,
            as:'class',
            foreignKey: 'classId'
            
        });
    };
    
    return Class;
};