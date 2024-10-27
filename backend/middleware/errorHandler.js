import ErrorResponse from "../util/ErrorResonse.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  console.log("Error1->", error);

  if (err.name === "CastError") {
    error = new ErrorResponse(404, `Resource not found with ${err.value}`);
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.path); // Extract the message field from each error
    console.log("messa ", messages);
    error = new ErrorResponse(
      400,
      `Invalid Response for ${messages.join(", ")}`
    ); // Join messages into a single string
  }

  const statusCode = error.status || 500;
  res.status(statusCode).json({
    sucess: false,
    error: error.message || "Internal Error Signal",
  });
};

export default errorHandler;
