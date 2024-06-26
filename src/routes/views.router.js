const viewsRouter = require("express").Router()

viewsRouter.get("/", (req, res) => {
    res.render("index")
})

module.exports = viewsRouter