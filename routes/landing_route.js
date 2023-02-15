const express = require("express")
const router = express.Router()

const LandingDao = require("../DAO/landing.dao.js")
const lDao = new LandingDao()

//get all documents count by document type 
router.get("/getNumbersByDocumentType", (req, res) => {
    lDao.getNumbersByDocumentType()
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No documents found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})

//get all documents by document type 
router.get("/getDocumentsByDocumentType", (req, res) => {
    lDao.getAllDocumentsByDocumentType()
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No documents found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })        
        })
})

module.exports = router