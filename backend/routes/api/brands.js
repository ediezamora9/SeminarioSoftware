const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/is-auth");
const isAdmin = require("../../middleware/is-admin");
const brandController = require("../../controllers/brand");

router.get("/getbrands", isAuth, brandController.getAllBrands);

router.get("/getbrand/:brandID", isAuth, brandController.getBrand);

router.post("/addbrand", isAuth, isAdmin, brandController.addBrand);

router.put("/updatebrand", isAuth, isAdmin, brandController.updateBrand);

router.put("/addyear", isAuth, isAdmin, brandController.addYear);

router.delete("/deletebrand", isAuth, isAdmin, brandController.deleteBrand);

router.put("/deleteYear", isAuth, isAdmin, brandController.deleteYear);

router.put("/updateyear", isAuth, isAdmin, brandController.updateYear);

module.exports = router;
