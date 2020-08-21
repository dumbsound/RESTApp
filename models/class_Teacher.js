module.exports=(sequelize, DataTypes) => {
    const class_Teacher = sequelize.define('class_Teacher', {
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      }
    });

    class_Teacher.associate = (models) => {
        class_Teacher.belongsTo(models.Class, {
            foreignKey: 'classId', 
            as: 'class' });

        class_Teacher.belongsTo(models.Teacher, { 
            foreignKey: 'teacherId',
            as: 'teacher' });
      }

    return class_Teacher;
  };