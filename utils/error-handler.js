const errorHandler = (err, req, res, next) => {
  const errorResponse = {
    error: {
      type: err?.type,
      message: err?.message,
    },
    success: false,
  };
  res.status(200).send(errorResponse);
};

module.exports = errorHandler;
