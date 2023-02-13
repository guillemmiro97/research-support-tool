const express = require("express")
const router = express.Router()

const LandingDao = require("../DAO/landing.dao.js")
const lDao = new LandingDao()

//get all journals
router.get("/getNumbersByDocumentType", (req, res) => {
    lDao.getNumbersByDocumentType()
        .then((results) => {
            res.json(results)
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            res.json({ error: err })
        })
})

module.exports = router