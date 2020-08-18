module.exports=(sequelize, DataTypes)=>{
    const Teacher=sequelize.define("Teacher",{
        teacherId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        teacherName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        teacherEmail:{
            type:DataTypes.STRING,
            allowNull:false
        },
        toDelete:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    Teacher.associate=models=>{
        Teacher.belongsToMany(models.Class,{
            through:'teachers_classes',
            foreignKey:'teacherId',
            // onDelete:'cascade'
        });

        Teacher.belongsToMany(models.Subject,{
            through:'teachers_subjects',
            foreignKey:'teacherId',
            // onDelete:'cascade'
        });
    };

    return Teacher;
};