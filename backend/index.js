//mongoose version with schema
import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import credentialModel from "./Schema/credentialSchema.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.Mongo_URI);

app.get("/", async (req, res) => {
  const response = await credentialModel.find({})
  res.send(response);
});

app.post("/", async (req, res) => {
  const response = await credentialModel.create(req.body);
  // let response =await credentialModel.insertMany([req.body]);
  res.send(response);
});

app.delete("/", async (req, res) => {

  const response = await credentialModel.deleteOne(req.body);
  res.send(response);
});

app.listen(3000, () => {
  console.log("listening");
});
