const mongoose = require("mongoose");
let password = encodeURIComponent("(Aniket#7)");
const mongoUri = `mongodb+srv://foodApp-2:${password}@cluster0.em08oe8.mongodb.net/foodApp?retryWrites=true&w=majority`;
const mongoDB = async () => {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
  try {
    const foodItems = await mongoose.connection.db.collection("food_items");
    const foodCategory = await mongoose.connection.db.collection(
      "food_category"
    );
    const data = await foodItems.find({}).toArray();
    const categoryData = await foodCategory.find({}).toArray();
    // console.log(data);
    // console.log("\n "+"new data \n")
    // console.log(categoryData);

    global.food_items = data;
    global.food_cateory = categoryData;
  } catch (error) {
    console.error(error);
  }
};

module.exports = mongoDB;
