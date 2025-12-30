const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/configs");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

//GET /users/me - returns a user by id
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new NotFoundError("User not found");
        return next(err);
      }

      return res.send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        const err = new BadRequestError("Invalid ID format");
        return next(err);
      }

      return next(error);
    });
};

//PATCH users/me - update current user
module.exports.updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        const err = new NotFoundError("User not found");
        return next(err);
      }

      return res.status(200).send(updatedUser);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        const err = new BadRequestError("Invalid user data");
        return next(err);
      }
      if (error.name === "CastError") {
        const err = new BadRequestError("Invalid ID format");
        return next(err);
      }

      return next(error);
    });
};

//POST /users/signup - create new user a.k.a signup
module.exports.signup = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(200).send(userObject);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        const err = new BadRequestError("Inavlid user data");
        return next(err);
      }
      if (error.code === 11000) {
        const err = new ConflictError("Email already exsits");
        return next(err);
      }

      return next(error);
    });
};

//POST users/login - authenticate user a.k.a login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new BadRequestError(
      "The email and password fields are required"
    );
    return next(err);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((error) => {
      //Authentication error
      if (error.message.includes("Incorrect email or password")) {
        const err = new UnauthorizedError(error.message);
        return next(err);
      }
      return next(error);
    });
};
