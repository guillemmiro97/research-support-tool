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
    siDao.getSpecialIssueByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
            res.json({ error: err })
        })
})

//search Special Issue by title
router.get("/search/:title", (req, res) => {
    siDao.searchSpecialIssuelByTitle(req.params.title)
        .then((results) => {
            res.json(results)
        })
        .catch((err) => {
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

module.exports = router