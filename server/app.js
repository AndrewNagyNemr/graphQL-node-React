const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://andrew:AndrewNagyNemr2015@cluster0.vjfww.mongodb.net/graphQL?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("listening on port 4000");
});
