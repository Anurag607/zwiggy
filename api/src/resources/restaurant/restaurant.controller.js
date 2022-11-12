const restaurantService = require('./restaurant.service');
const categoryService=require('../category/category.service');
const fooditemService=require('../fooditems/fooditems.service');
const { json } = require('body-parser');

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

const getRestaurantMenu = async (req,res)=>{
  const menu = {};
  const data= await categoryService.getAllCategories(req.params['id']);
  // console.log(data);
  for(const i in data){
    const { name, id } = data[i];
    const fooditem=await fooditemService.getFoodItembyCategory(id);
    menu[name] = fooditem;
  }

  res.status(200).json(JSON.parse(JSON.stringify(menu)));
}
const getRestaurantsByCity = async (req, res) => {
  const city = req.params['city'].toLowerCase()
  const data = await restaurantService.getRestaurantsByCity(city);
  res.status(200).json(JSON.parse(JSON.stringify(data)));
}

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getRestaurantMenu,
  getRestaurantsByCity
}
