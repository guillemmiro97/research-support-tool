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

const SpecialIssuesDAO = require("../DAO/special_issues.dao.js")
const siDao = new SpecialIssuesDAO()

//get all Special Issues
router.get("/", (req, res) => {
    siDao.getAll()
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No Special Issues found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })        
        })
})

//get Special Issue by title
router.get("/:title", (req, res) => {
    siDao.getDocumentByTitle(req.params.title)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No Special Issues found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })        
        })
})

//search Special Issue by title
router.get("/search/:title", (req, res) => {
    siDao.searchDocumentByTitle(req.params.title)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No Special Issues found" })
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
    siDao.getDocumentByTag(req.params.tag)
        .then((results) => {
            if (results.length === 0) {
                res.status(404).json({ error: "No Special Issues found" })
            } else {
                res.status(200).json(results)
            }
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
})

router.post("/tags", (req, res) => {
    siDao.getDocumentsByTags(req.body)
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

//insert new Special Issue
router.post("/", (req, res) => {

    if(!siDao.verifyJsonWebToken(req)) {
        res.status(401).json({ error: "Unauthorized" })
    } else {
        siDao.insert(req.body)
            .then((results) => {
                if(results.acknowledged === true) {
                    res.status(201).json({ acknowledged: results.acknowledged,
                        response: "Special Issue inserted" })
                } else {
                    res.status(400).json({ acknowledged: results.acknowledged,
                            error: results.error })
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err })
            })
    }
})

//delete Special issue by title
router.delete("/:title", (req, res) => {
    siDao.deleteDocumentByTitle(req.params.title)
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