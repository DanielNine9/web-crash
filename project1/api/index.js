import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
const app = express()

dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connect to mongoDB")
    } catch (e) {
        throw e;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected")
})


mongoose.connection.on("connected", () => {
    console.log("Connected")
})

// middleware
app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)
app.use((err, req, res, next) => {
    res.status(500).json(err)
})

app.use("*", (req, res) => {
    res.status(404).json("Not found")
})

app.listen(8800 , () => {
    connect()

    console.log("localhost:8800 ")
})

