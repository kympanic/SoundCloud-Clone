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

const checkUserEmail = (req, res, next) => {
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
		err.message = "User already exists";
		err.errors = errors;
		res.statusCode = 403;

		res.json({
			message: err.message,
			statusCode: res.statusCode,
			errors,
		});
		next(err);
	}
	next();
};

module.exports = {
	handleValidationErrors,
	checkUserEmail,
};
