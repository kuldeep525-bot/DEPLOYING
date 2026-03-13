import { body } from "express-validator";

export const registerValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 character long."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid."),

  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })

    .withMessage(
      "Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one number, and one symbol.",
    ),
];

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push("Email is required.");
  if (!password) errors.push("Password is required.");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors,
    });
  }

  next();
};
