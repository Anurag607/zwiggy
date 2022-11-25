const fooditemsService = require('./fooditems.service');

const getAllFoodItems = async (req, res) => {
  const [data, ] = await fooditemsService.getAllFoodItems(req.params['name']);
  res.status(200).json(JSON.parse(JSON.stringify(data)));
}
module.exports = {
  getAllFoodItems
}