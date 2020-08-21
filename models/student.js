module.exports=(sequelize, DataTypes)=>{
    const Student=sequelize.define('Student',{
        studentName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
              }
        },
        studentEmail:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                notEmpty: true,
                isEmail:true
              }
        }
    });

    Student.associate = models=>{
        models.Student.belongsToMany(models.Class,{
            through:'class_Student',
            as:'classStudent'
           
        })
    };

    return Student;
};