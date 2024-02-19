const userController = require("../controller/user.controller")

module.exports = function Route(app) {
    app.post("/users/signUp", userController.signUp)
    // app.post("/api/users/signIn", userController.signIn)
    // app.put("/api/users/edit", userController.update)
    // app.delete("/api/users/deleteById", userController.deleteById)
    // app.get("/api/users/findById", userController.findById)
    // app.get("/api/users/findAll", userController.findAll)
    // app.post("/api/users/forgot-password", userController.forgot_password)
    // app.post("/api/users/reset-password", userController.reset_password)
}