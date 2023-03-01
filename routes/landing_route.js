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