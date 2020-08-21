module.exports=(sequelize, DataTypes)=>{
    const Teacher=sequelize.define('Teacher',{
        teacherName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
              }
        },
        teacherEmail:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                notEmpty: true,
                isEmail:true
              }
        },
        toDelete:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
              }
        }
    });

    Teacher.associate=models=>{
        models.Teacher.belongsToMany(models.Class,{
            through: models.class_Teacher,
            as:'class',
            foreignKey:'teacherId'
        });
    };

    return Teacher;
    
};