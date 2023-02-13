const GenericDAO = require("./generic.dao");

class SpecialIssuesDAO extends GenericDAO {
    constructor() {
        super("special_issues");
    }
}

module.exports = SpecialIssuesDAO;