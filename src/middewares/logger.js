const graphqlLogger = (req, res, next) => {
  if (req.body && req.body.query) {
    console.log(
      `\x1b[34mGraphQL Request: ${req.body.operationName || "Unnamed"} - ${
        req.body.query.trim().split("\n")[0]
      }\x1b[0m`
    );
  }
  next();
};

module.exports = graphqlLogger;
