import express from "express";

// Instance Express
const app = express();

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});
