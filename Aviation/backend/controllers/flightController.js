const Item = require("../models/flight");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.delete('/api/flight/:id', async (req, res) => {
  const { id } = req.params;
  try {
  
    const result = await FlightModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'Flight deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Flight not found!' });
    }
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




