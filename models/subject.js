module.exports=(sequelize, DataTypes)=>{
    const Subject=sequelize.define("Subject",{
        subjectCode:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                notEmpty: true
              }
        },
        subjectName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
              }
        }
    });

    Subject.associate=models=>{
        Subject.belongsToMany(models.Teacher,{
            through:'teachers_subjects',
            as: '',
            foreignKey: 'subjectId'
        });
    };

    return Subject;
};