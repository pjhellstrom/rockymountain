module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Note;
};
