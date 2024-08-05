const db = require("../models");
const Booking = db.bookings;
const Op = db.Sequelize.Op;

// Create and Save a new Booking
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.room) {
    res.status(400).send({
      message: "Room can not be empty!"
    });
    return;
  }

  if (!req.body.person) {
    res.status(400).send({
      message: "Person can not be empty!"
    });
    return;
  }

  // Create Booking
  const booking = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    person: req.body.person,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    room: req.body.room,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  // Save Booking in the database
  Booking.create(booking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Booking."
      });
    });
};

// Retrieve all Bookings from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const room = req.query.room;
    const date = req.query.date;
    const month = req.query.month;
    const year = req.query.year;
    const person = req.query.person;
    
    var condition_title = title ? { title: { [Op.like]: `%${title}%` } } : null;
    var condition_room = room ? { room: { [Op.like]: `%${room}%` } } : null;
    var condition_date = date ? { date: { [Op.startsWith]: `${date}%` } } : null;
    var condition_month = month ? { month: { [Op.startsWith]: `${month}%` } } : null;
    var condition_year = year ? { year: { [Op.startsWith]: `${month}%` } } : null;
    var condition_person = person ? { person: { [Op.like]: `%${person}%` } } : null;
    
    console.log("req.query.title is: " + title);
    console.log("req.query.room is: " + room);
    console.log("the condition is: " + condition_title);
    console.log("the condition is: " + condition_room);
  
    Booking.findAll({ where: {
      [Op.and]: [
         condition_title,
         condition_room,
         condition_date, 
         condition_month,
         condition_year,
         condition_person
      ]
    } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving bookings."
        });
      });
};

// Find a single Booking with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Booking.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Booking with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Booking with id=" + id
        });
      });
};

// Update a Booking by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Booking.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Booking was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Booking with id=" + id
        });
      });
};

// Delete a Booking with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Booking.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Booking was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Booking with id=" + id
        });
      });
};

// Delete all Bookings from the database.
exports.deleteAll = (req, res) => {
    Booking.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Bookings were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all bookings."
          });
        });
};

// Find all published Bookings
exports.findAllPublished = (req, res) => {
    Booking.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
