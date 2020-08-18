module.exports=(sequelize, DataTypes)=>{
    const Student=sequelize.define("Student",{
        studentId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        studentName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        studentEmail:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    const Categories=Student.associate = models=>{
        Student.belongsToMany(models.Class,{
            through: 'student_classes',
            foreignKey: 'studentId',
            // onDelete:"cascade"
        })
    };

    return Student;
};