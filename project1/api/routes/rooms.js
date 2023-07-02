import express from "express"
import { createRoom, getRoom, getRooms, deleteRoom, updateRoom } from "../controllers/rooms.js"
const router = express.Router()

router.post("/:hotelid", createRoom)
    .get("/:id", getRoom)
    .get("/", getRooms)
    .delete("/:id/:hotelid", deleteRoom)
    .put("/:id", updateRoom)




export default router