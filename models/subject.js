module.exports=(sequelize, DataTypes)=>{
    const Subject=sequelize.define('Subject',{
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
        models.Subject.belongsToMany(models.Teacher,{
            through:'subject_Teacher',
            as:'subjectTeacher',

        });
    };

    return Subject;
};