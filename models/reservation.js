const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: ObjectId,
      required: true,
    },
    reservationTime: {
      type: Number,
      required: true,
      default: 0,
    },
    reservationNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true, collection: 'reservations' }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

function validateReservation(reservation) {
  const schema = Joi.object({
    name: Joi.string().required().email(),
    restaurantId: Joi.objectId().required(),
    reservationTime: Joi.number().required(),
    reservationNumber: Joi.number().required(),
  });
  return schema.validate(reservation);
}

module.exports = {
  Reservation,
  validateReservation,
};
