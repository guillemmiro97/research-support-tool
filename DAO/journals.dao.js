const GenericDAO = require("./generic.dao");

class JournalsDAO extends GenericDAO {
    constructor() {
        super("journals");
    }

    async getJournalByISSN(issn) {
        try {
            const [results] = await global.db.collection(this.collection).find({ ISSN: issn }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

module.exports = JournalsDAO;