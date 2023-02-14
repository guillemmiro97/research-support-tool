const express = require("express")
const router = express.Router()

const SpecialIssuesDAO = require("../DAO/special_issues.dao.js")
const siDao = new SpecialIssuesDAO()

//get all Special Issues
router.get("/", (req, res) => {
    siDao.getAll()
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
            res.json({ error: err })
        })
})

//get Special Issue by title
router.get("/:title", (req, res) => {
    siDao.getDocumentByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
            res.json({ error: err })
        })
})

//search Special Issue by title
router.get("/search/:title", (req, res) => {
    siDao.searchDocumentByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
            res.json({ error: err })
        })
})

//get Journal by tag
router.get("/tag/:tag", (req, res) => {
    siDao.getDocumentByTag(req.params.tag)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            res.json({ error: err })
        })
})

//insert new Special Issue
router.post("/", (req, res) => {
    siDao.insert(req.body)
        .then((results) => {
            if(results.acknowledged === true) {
                res.json({ acknowledged: results.acknowledged,
                    response: "Special Issue inserted" })
            } else {
                res.json({ acknowledged: results.acknowledged,
                        error: results.error })
            }
        })
        .catch((err) => {
            console.log(err)
            res.json({ error: err })
        })
})

//delete Special issue by title
router.delete("/:title", (req, res) => {
    siDao.deleteDocumentByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => { //TODO: personalizar error y códigos de error
            res.json({ error: err })
        })
})

module.exports = router