module.exports = (db, DataTypes) => {
  const User = db.define('User', { 
    id:{ 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      allowNull: false,
      primaryKey: true
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false 
    }
  }, {
    timestamps: false
  })
  return User
}