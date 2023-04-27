/** 
* @package research-support-tool 
* @copyright 2023 Daniel Amo * daniel.amo@salle.url.edu 
* @copyright 2023 La Salle Campus Barcelona, Universitat Ramon Llull https://www.salleurl.edu 
* @author Daniel Amo 
* @author Guillem Miró Sierra
* @author Faozi Bouybaouene Gadrouz
* @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later 
*/

const jwt = require("jsonwebtoken");

class GenericDAO {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        try {
            const results = await global.db.collection(this.collection).find({}).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDocumentByTitle(title) {
        try {
            const [results] = await global.db.collection(this.collection).find({ title: title }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async searchDocumentByTitle(title) {
        try {
            const results = await global.db.collection(this.collection).find({ title: { $regex: title, $options: 'i' } }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDocumentByTag(tag) {
        try {
            const results = await global.db.collection(this.collection).find({ tags: { $regex: tag, $options: 'i' } }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDocumentsByTags(data) {
        try {
            const results = await global.db.collection(this.collection).find({ tags: { $all: data.tags } }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async insert(data) {
        //check if journal already exists
        const [results] = await global.db.collection(this.collection).find({ title: data.title }, ).toArray();
        if(results) {
            return { acknowledged: "false", error: "Document already exists" };
        } else {
            const response = await global.db.collection(this.collection).insertOne(data);
            return response;
        }
    }

    async deleteDocumentByTitle(title) {
        try {
            const result = await global.db.collection(this.collection).deleteOne({ title: title });
            if (result.deletedCount === 1) {
                return { deleted: "true", response: "Document deleted" };
            } else {
                return { deleted: "false", error: "Document not deleted" };
            }
        } catch (error) {
            console.error(error);
            return { deleted: "false", error: error };
        }
    }

    verifyJsonWebToken(req) {
        try {
            const authHeader = req.headers.authorization
            const token = authHeader.split(" ")[1];
            
            if (!token) return false

            jwt.verify(token, process.env.JWT_SECRET);
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = GenericDAO;