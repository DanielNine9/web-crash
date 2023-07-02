import express from "express"
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotels.js"
const router = express.Router()

router.post("/", createHotel)
      .get("/:id", getHotel)
      .get("/", getHotels)
      .put("/:id", updateHotel)
      .delete("/:id", deleteHotel)


export default router