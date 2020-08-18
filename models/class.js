module.exports=(sequelize, DataTypes)=>{
    const Class=sequelize.define("Class",{
        classId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        classCode:{
            type:DataTypes.STRING,
            allowNull:false
        },
        className:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    Class.associate=models=>{
        Class.belongsToMany(models.Teacher,{
            through:'teachers_subjects',
            // foreignKey:'classId'
            // onDelete:'cascade'
        });

        Class.belongsToMany(models.Student,{
            through:'teachers_subjects',
            // foreignKey:'classId'
            // onDelete:'cascade'
        });
    };

    return Class;
};