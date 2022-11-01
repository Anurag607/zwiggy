const restaurantService = require('./restaurant.service');

const getAllRestaurants = async (req, res) => {
  const data = await restaurantService.getAllRestaurants();
  res.status(200).json(JSON.parse(JSON.stringify(data)));
}

const createRestaurant = async (req, res) => {
  all_fields = ["name", "address", "rating"];
  required_fields = ["name"];

  // check for data validity
  for(const i in required_fields) {
    if(req.body[required_fields[i]] == null) {
      res.status(400).json({message: `${required_fields[i]} field is required`});
    }
  }

  req.body["rating"] = parseFloat(req.body["rating"]);

  const insertId = await restaurantService.createRestaurant(req.body);
  const data = await restaurantService.getOneRestaurant(insertId);
  res.status(201).json(JSON.parse(JSON.stringify(data)));
}

module.exports = {
  getAllRestaurants,
  createRestaurant
}
