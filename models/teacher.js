module.exports=(sequelize, DataTypes)=>{
    const Teacher=sequelize.define("Teacher",{
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
        Teacher.belongsToMany(models.Class,{
            through:'classTeachers',
            as: '' ,
            foreignKey: 'teacherId'
        });
    };

    return Teacher;
    
};