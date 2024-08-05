module.exports = app => {
    const bookings = require("../controllers/booking.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Booking
    router.post("/", bookings.create);
  
    // Retrieve all Bookings (by condition)
    router.get("/", bookings.findAll);
  
    // Retrieve all published Bookings
    router.get("/published", bookings.findAllPublished);
  
    // Retrieve a single Booking with id
    router.get("/:id", bookings.findOne);
  
    // Update a Booking with id
    router.put("/:id", bookings.update);
  
    // Delete a Booking with id
    router.delete("/:id", bookings.delete);
  
    // Delete all Bookings
    router.delete("/", bookings.deleteAll);

    app.use('/api/bookings', router);
  };