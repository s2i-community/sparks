const mongoose = require("mongoose");

const connectionDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected");
  return;
};

module.exports = connectionDB;
