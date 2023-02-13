const GenericDAO = require("./generic.dao");

class JournalsDAO extends GenericDAO {
    constructor() {
        super("journals");
    }

    async getJournalByISSN(issn) {
        const [results] = await global.db.collection(this.collection).find({ ISSN: issn }).toArray();
        return results;
    }
}

module.exports = JournalsDAO;