const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      min: 5,
      max: 255,
      unique: true,
      sparse: true,
    },
    googleId: {
      type: String,
      default: undefined,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      trim: true,
      default: '',
      maxlength: 1024,
    },
    avatar: {
      type: String,
      default: undefined,
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    address: {
      type: addressSchema,
    },
    favoriteFood: {
      type: String,
    },
    contactNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    bookmarkPlaces: [{ type: String, ref: 'Bookmark' }],
    // favoritePlaces: {
    //   type: Number,
    //   default: 0,
    // },
    // tryOutPlaces: {
    //   type: Number,
    //   default: 0,
    // },
    // bookmarkPlaces: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true, collection: 'users' }
);

//* Middleware before creating new user
userSchema.pre('save', async function (next) {
  let user = this;
  //* only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//* Some Utils func
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'GO_FOOD_APP');
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email: email });
  if (!user) {
    return undefined;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return undefined;
  }
  return user;
};

userSchema.virtual('bookmarks', {
  ref: 'Bookmark',
  localField: 'bookmarkPlaces',
  foreignField: 'restaurantId',
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

function validateSignUpUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    fullname: Joi.string().trim().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    rePassword: Joi.ref('password'),
  });
  return schema.validate(user);
}

function validateUserInfo(user) {
  const schema = Joi.object({
    address: Joi.required(),
    favoriteFood: Joi.string().required(),
  });
  return schema.validate(user);
}

function validateLogInUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

function validateUpdateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string().trim().min(5).max(50),
    contactNumber: Joi.string()
      .max(11)
      .trim()
      .regex(/^[0-9]{7,10}$/),
  });
  return schema.validate(user);
}

function validateUpdatePassword(user) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(5).max(255).required(),
    newPassword: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validateLogInUser,
  validateSignUpUser,
  validateUpdateUser,
  validateUpdatePassword,
  validateUserInfo,
};
