const express = require("express");
const uuid = require("uuid");
const resData = require("../utilities/restaurants-data");
const router = express.Router();

router.get("/restaurants", function (req, res) {
  //   const HtmlFilePath = path.join(__dirname, "views", "restaurants.html");
  //   res.sendFile(HtmlFilePath);
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  
  if (order === "desc") {
    nextOrder = "asc";
  }

  const restaurantList = resData.getRestaurantList();
  console.log(order);
  restaurantList.sort(function (restaurantA, restaurantB) {
    if (
      (order === "asc" && restaurantA.name > restaurantB.name) ||
      (order === "desc" && restaurantB.name > restaurantA.name)
    ) {
      return 1;
    }
    return -1;
  });
  res.render("restaurants", {
    numberOfRes: restaurantList.length,
    restaurants: restaurantList,
    nextOrder: nextOrder,
  });
});
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const restaurantList = resData.getRestaurantList();
  for (const restaurant of restaurantList) {
    if (restaurantId === restaurant.id) {
      return res.render("restaurant-details", { restaurant: restaurant });
    }
  }
  router.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  //   const HtmlFilePath = path.join(__dirname, "views", "recommend.html");
  //   res.sendFile(HtmlFilePath);
  res.render("recommend");
});
router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurantList = resData.getRestaurantList();
  restaurantList.push(restaurant);

  resData.storeRestaurantList(restaurantList);
  router.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  //   const HtmlFilePath = path.join(__dirname, "views", "confirm.html");
  //   res.sendFile(HtmlFilePath);
  res.render("confirm");
});

module.exports = router;
