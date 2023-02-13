const GenericDAO = require("./generic.dao");

class JournalsDAO extends GenericDAO {
    constructor() {
        super("journals");
    }

    async getJournalByISSN(issn) {
        const [results] = await global.db.collection(this.collection).find({ ISSN: issn }).toArray();
        return results;
    }

    async insert(journal) {
        //check if journal already exists
        const [results] = await global.db.collection(this.collection).find({ title: journal.title }, ).toArray();
        console.log(results);
        if(results) {
            return { acknowledged: "false", error: "Journal already exists" };
        } else {
            const response = await global.db.collection(this.collection).insertOne(journal);
            return response;
        }
    }
}

module.exports = JournalsDAO;