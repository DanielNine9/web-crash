import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

const createRoom = async (req, res, next) => {
    console.log(req.body)
    try {
        const newRoom = await new Room(req.body).save()

        await Hotel.findByIdAndUpdate(req.params.hotelid, { $push: { rooms: newRoom._id } })
        res.status(201).json(newRoom)
    } catch (e) {
        next("hello world")
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updateRoom)
    } catch (e) {
        next(e)
    }
}

const deleteRoom = async (req, res, next) => {
    try{
        console.log(req.params)
        await Room.findByIdAndDelete(req.params.id)
        await Hotel.findByIdAndUpdate(req.params.hotelid, {$pull: {rooms: req.params.id}})
        res.status(200).send("Room has been")
    }catch(e){
        next(e)
    }
}

const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findOne({_id: req.params.id})
        res.status(200).json(room)
    } catch (e) { next(e) }
}

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (e) {
        next(e)
    }
}

export { createRoom, updateRoom, getRoom, getRooms, deleteRoom }