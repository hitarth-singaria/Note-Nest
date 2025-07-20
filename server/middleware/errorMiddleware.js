// server/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Sometimes an error is thrown but the status code is still 200.
  // This line ensures that if an error occurs, we set an appropriate error status code.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // This is the crucial part. It sends a JSON response with the specific
  // error message (e.g., "User already registered...").
  // Our frontend is designed to read this exact 'message' field.
  res.json({
    message: err.message,
    // We only send the detailed stack trace if we are in development mode for debugging.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
