const express = require("express");
const router = express.Router();
const itemController = require("../controller/reviewController");
router.get("/", itemController.getAllItems);
router.post("/", itemController.createItem);
router.get("/:id", itemController.getbyid);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;