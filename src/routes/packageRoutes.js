const express = require("express")
const router = express.Router()

const packageController = require("../controllers/packageController")
const authenticateToken = require("../middleware/auth")

router.get("/search", packageController.searchPackages)

router.get("/:id", packageController.getPackageDetails)

router.post("/book", authenticateToken, packageController.bookPackage)

module.exports = router