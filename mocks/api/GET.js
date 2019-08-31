module.exports = (request, response) => {
  setTimeout(() => {
    response.status(200).send();
  }, 200);
};
