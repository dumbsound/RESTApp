module.exports=(sequelize, DataTypes)=>{
    const Subject=sequelize.define("Subject",{
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        subjectCode:{
            type:DataTypes.STRING,
            allowNull:false
        },
        subjectName:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    Subject.associate=models=>{
        Subject.belongsTo(models.Teacher,{
            through:'teachers_subjects'
        });
    };

    return Subject;
};