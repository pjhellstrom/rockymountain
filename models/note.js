module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
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
