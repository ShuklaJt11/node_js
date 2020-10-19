const Sequelize = require('sequelize')
module.exports = (db, DataTypes) => {
  const Playlist = db.define('playlist', { 
    id:{ 
      type: DataTypes.INTEGER, 
      autoIncrement:true, 
      allowNull:false,
      primaryKey:true
    }, 
    name: { 
      type: DataTypes.STRING, 
      allowNull:false 
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW 
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW 
    }
  })
  return Playlist
}