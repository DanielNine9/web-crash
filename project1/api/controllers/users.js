const updateUser = (req, res, next) => {
    res.send("You can update your account")
}

const deleteUser = (req, res, next) => {
    res.send("You can delete all account")
}

export { updateUser, deleteUser }