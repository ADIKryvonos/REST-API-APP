const httpErrorMessage = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = httpErrorMessage[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
