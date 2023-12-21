export const internalServerError = (res) => {
  return res.status(500).json({ err: "Interval server error" });
};

export const invalidreq = (status, err, res) => {
  return res.status(status).json(err);
};
