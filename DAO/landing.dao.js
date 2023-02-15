const GenericDAO = require("./generic.dao");

class LandingDAO extends GenericDAO {
    constructor() {
        super("landing");
    }

    async getNumbersByDocumentType() {
        try {
            const collections = await global.db.listCollections().toArray();
            const counts = [];
    
            for (const collection of collections) {
                const count = await global.db.collection(collection.name).countDocuments();
                counts.push({ collection: collection.name, count: count });
            }
    
            return counts;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getAllDocumentsByDocumentType() {
        try {
            const collections = await global.db.listCollections().toArray();
            console.log(collections);
            const allCollections = [];
    
            for (const collection of collections) {
                let documents = await global.db.collection(collection.name).find().toArray();
                allCollections.push({ collection: collection.name, documents: documents });
            }
    
            return allCollections;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}

module.exports = LandingDAO;