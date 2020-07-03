const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'bookmarks' }
);

// userSchema.statics.findByCredentials = async function (email, password) {
//   const user = await User.findOne({ email: email });
//   if (!user) {
//     return undefined;
//   }
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return undefined;
//   }
//   return user;
// };

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

function validateBookmark(bookmark) {
  const schema = Joi.object({
    restaurantName: Joi.string().required(),
    rating: Joi.number().required(),
    imageUrl: Joi.string().required(),
    price: Joi.string().required(),
    categories: Joi.string().required(),
    address: Joi.string().required(),
  });
  return schema.validate(bookmark);
}

module.exports = {
  Bookmark,
  validateBookmark,
};
