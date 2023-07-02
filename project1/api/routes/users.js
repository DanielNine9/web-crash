import express from "express"
import { deleteUser, updateUser } from "../controllers/users.js"
import { verifyToken } from "../utils/verifyToken.js"
const router = express.Router()

router.get("/",verifyToken, (req, res) => {
    res.send("hello by users")
})
.delete("/:id",verifyToken, deleteUser)
.put("/:id",verifyToken, updateUser)


export default router