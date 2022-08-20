const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		const errors = validationErrors.array().map((error) => `${error.msg}`);

		const err = Error("Bad request.");
		err.message = "Validation Error";
		err.errors = errors;
		// err.status = 400;
		res.statusCode = 400;
		res.json({
			message: err.message,
			statusCode: res.statusCode,
			// errors: validationErrors.array(),
			errors: err.errors,
		});
		next(err);
	}
	next();
};

module.exports = {
	handleValidationErrors,
};
