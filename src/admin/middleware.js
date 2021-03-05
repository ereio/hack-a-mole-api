export const exampleMiddleware = (models) => async (req, res) => {
  res.status(200).json({ status: 'ok' });
};
