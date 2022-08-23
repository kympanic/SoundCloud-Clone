const { validationResult } = require("express-validator");
const { ValidationError } = require("sequelize");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, res, next) => {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		const errors = new Object();
		validationErrors.array().forEach((errObj) => {
			let errorKey = errObj.param;
			if (!errors[errorKey]) {
				errors[errorKey] = errObj.msg;
			}
		});

		const err = Error("Bad request.");
		err.message = "Validation Error";
		err.errors = errors;
		res.statusCode = 400;

		res.json({
			message: err.message,
			statusCode: res.statusCode,
			errors,
		});
		next(err);
	}
	next();
};

// const checkUserEmail = async (err, req, res, next) => {
// 	err.message = "User already exists";
// 	err.status = 403;
// 	if (err.errors.email) {
// 		err.errors.email = "User with that email already exists";
// 	}
// 	if (err.errors.username) {
// 		err.errors.username = "User with that username already exists";
// 	}
// 	next(err);
// };

module.exports = {
	handleValidationErrors,
};
