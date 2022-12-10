const express = require("express")
const router = express.Router()

const GenericDAO = require("../DAO/generic.dao.js")
const gDao = new GenericDAO("journals")

router.get("/", (req, res) => {
    gDao.getAll()
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
            res.json({ error: err })
        })
})

module.exports = router