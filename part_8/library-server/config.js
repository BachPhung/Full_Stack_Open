const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

const config = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
};

module.exports = config;
