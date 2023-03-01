/** 
* @package research-support-tool 
* @copyright 2023 Daniel Amo * daniel.amo@salle.url.edu 
* @copyright 2023 La Salle Campus Barcelona, Universitat Ramon Llull https://www.salleurl.edu 
* @author Daniel Amo 
* @author Guillem Miró Sierra
* @author Faozi Bouybaouene Gadrouz
* @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later 
*/

const express = require("express")
const router = express.Router()

const JournalsDAO = require("../DAO/journals.dao.js")
const jDao = new JournalsDAO()

//get all journals
router.get("/", (req, res) => {
    jDao.getAll()
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No journals found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

//get journal by title
router.get("/:title", (req, res) => {
    jDao.getDocumentByTitle(req.params.title)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No journals found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

//search journal by title
router.get("/search/:title", (req, res) => {
    jDao.searchDocumentByTitle(req.params.title)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No journals found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

//get journal by ISSN
router.get("/issn/:issn", (req, res) => {
    jDao.getJournalByISSN(req.params.issn)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No journals found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

//get Journal by tag
router.get("/tag/:tag", (req, res) => {
    jDao.getDocumentByTag(req.params.tag)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No journals found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

router.post("/tags", (req, res) => {
    jDao.getDocumentsByTags(req.body)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No journals found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

//insert new journal
router.post("/", (req, res) => {
    jDao.insert(req.body)
        .then((results) => { 
            if(results.acknowledged === true) {
                res.status(201).json({ acknowledged: results.acknowledged,
                    response: "Journal inserted" })
            } else {
                res.status(400).json({ acknowledged: results.acknowledged,
                    error: results.error })
            }
        })
        .catch((err) => { 
            console.log(err)
            res.status(500).json({ error: err })
        })
})

//delete journal by title
router.delete("/:title", (req, res) => {
    jDao.deleteDocumentByTitle(req.params.title)
        .then((results) => {
            if(results.deleted) {
                res.status(200).json(results)
            } else {
                res.status(400).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

module.exports = router