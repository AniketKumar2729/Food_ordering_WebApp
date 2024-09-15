const express = require("express");
const router = express.Router();
router.post("/foodData",(req,res)=>{try {
    //console.log(global.food_items);
    //console.log(global.food_cateory)
    res.send([global.food_items,global.food_cateory])
} catch (error) {
    console.log(error.message);
    res.send("Server error")
}})
module.exports = router;