const GenericDAO = require("./generic.dao");

class SpecialIssuesDAO extends GenericDAO {
    constructor() {
        super("special_issues");
    }

    async getSpecialIssueByTitle(title) {
        const [results] = await global.db.collection(this.collection).find({ title: title }).toArray();
        return results;
    }

    async searchSpecialIssuelByTitle(title) {
        const [results] = await global.db.collection(this.collection).find({ title: { $regex: title } }).toArray();
        return results;
    }

    async insert(issue) {

        //check if journal already exists
        const [results] = await global.db.collection(this.collection).find({ title: issue.title }).toArray();
        console.log(results);
        if(results) {
            return { acknowledged: "false", error: "Special Issue already exists" };
        } else {
            const response = await global.db.collection(this.collection).insertOne(issue);
            return response;
        }
    }
}

module.exports = SpecialIssuesDAO;