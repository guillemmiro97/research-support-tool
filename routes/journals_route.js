const express = require("express")
const router = express.Router()

const JournalsDAO = require("../DAO/journals.dao.js")
const jDao = new JournalsDAO()

//get all journals
router.get("/", (req, res) => {
    jDao.getAll()
        .then((results) => {
            res.json(results)
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            res.json({ error: err })
        })
})

//get journal by title
router.get("/:title", (req, res) => {
    jDao.getDocumentByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            res.json({ error: err })
        })
})

//search journal by title
router.get("/search/:title", (req, res) => {
    jDao.searchDocumentByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            res.json({ error: err })
        })
})

//insert new journal
router.post("/", (req, res) => {
    jDao.insert(req.body)
        .then((results) => { 
            if(results.acknowledged === true) {
                res.json({ acknowledged: results.acknowledged,
                    response: "Journal inserted" })
            } else {
                res.json({ acknowledged: results.acknowledged,
                    error: results.error })
            }
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            console.log(err)
            res.json({ error: err })
        })
})

module.exports = router