const GenericDAO = require("./generic.dao");

class JournalsDAO extends GenericDAO {
    constructor() {
        super("journals");
    }

    async getJournalByTitle(title) {
        const [results] = await global.db.collection(this.collection).find({ title: title }).toArray();
        return results;
    }

    async searchJournalByTitle(title) {
        const results = await global.db.collection(this.collection).find({ title: { $regex: title, $options: 'i' } }).toArray();
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