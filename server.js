require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const errorHandler = require("./src/middewares/errorHandler");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./src/graphql/typeDefs/index");
const resolvers = require("./src/graphql/resolvers/index");

const app = express();
connectDB();
const schema = makeExecutableSchema({ typeDefs, resolvers });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}/graphql`)
);
