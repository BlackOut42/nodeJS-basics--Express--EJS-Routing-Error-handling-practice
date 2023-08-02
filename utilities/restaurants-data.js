const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getRestaurantList() {
  const fileData = fs.readFileSync(filePath);
  const restaurantList = JSON.parse(fileData);
  return restaurantList;
}
function storeRestaurantList(storedRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}
module.exports = {
  getRestaurantList: getRestaurantList,
  storeRestaurantList: storeRestaurantList,
};
