module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      person: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      room: {
        type: Sequelize.STRING 
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      }
    });
  
    return Booking;
  };