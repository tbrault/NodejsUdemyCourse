const notFound = (req, res) =>
  res.status(404).send("This route does not exists");

export default notFound;
