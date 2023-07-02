import Hotel from "../models/Hotel.js"

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(201).json(saveHotel)
    } catch (e) {
        next(e)
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (e) {
        next(e)
    }
}

const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (e) {
        next("Hotel not foundddd")
    }
}

const getHotels = async (req, res, next) => {
    try {
        const getAllHotel = await Hotel.find()
        res.status(200).json(getAllHotel)
    } catch (e) {
        next(e)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(204).json('"msg": "hotel has been')
    } catch (e) {
        next(e)
    }
}

export { createHotel, getHotel, getHotels, deleteHotel, updateHotel }