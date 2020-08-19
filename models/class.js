module.exports=(sequelize, DataTypes)=>{
    const Class=sequelize.define("Class",{
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
        Class.belongsToMany(models.Student,{
            through:'teachers_subjects',
            as: '',
            foreignKey: ''
            
        });
    };
    
    return Class;
};