const Item = require('../models/training');
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
					if (!updatedItem) return res.status(404).json({ message: " not found" });
						res.status(200).json(updatedItem);
					} catch (error) {
						res.status(500).json({ message: error.message });
					}
				};
			exports.deleteItem = async (req, res) => {
				try {
					const deletedItem = await Item.findByIdAndDelete(req.params.id);
					if (!deletedItem) return res.status(404).json({ message: " not found" });
						res.status(200).json({ message: " deleted successfully" });
					} catch (error) {
						res.status(500).json({ message: error.message });
					}
				};