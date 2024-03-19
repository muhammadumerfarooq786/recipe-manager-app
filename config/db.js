import mongoose from "mongoose";
const Connect_DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Successful Connection ${conn} `);
  } catch (err) {
    console.log(`Unsuccessful Connection ${err} `);
  }
};
export default Connect_DB;
