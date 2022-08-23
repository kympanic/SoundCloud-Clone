const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { environment } = require("./config");
const isProduction = environment === "production";
const { ValidationError } = require("sequelize");
const routes = require("./routes");
const { restart } = require("nodemon");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
	// enable cors only in development
	app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);

// Set the _csrf token and create req.csrfToken method
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
);

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

// Process sequelize errors

app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		const errors = new Object();
		err.errors.forEach((err) => {
			errors[err.path] = err.message;
		});

		err.status = 403;
		err.errors = errors;
		err.title = "Sequelize Errors";
	}
	next(err);
});

//check email and user if it exists
app.use((err, req, res, next) => {
	err.status = 403;
	err.message = "User already exists";
	if (err.errors.email) {
		err.errors.email = "User with that email already exists";
	}
	if (err.errors.username) {
		err.errors.username = "User with that username already exists";
	}
	next(err);
});

//error formatter
app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.json({
		message: err.message,
		statusCode: err.status,
		errors: err.errors,
	});
});

module.exports = app;
