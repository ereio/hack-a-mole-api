export const healthCheck = (models) => async (req, res) => {
  res.status(200).json({ status: 'ok' });
};

export const refreshToken = (models) => async (req, res) => {
  res.status(200).json({ status: 'ok' });
};