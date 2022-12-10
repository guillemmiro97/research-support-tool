class GenericDAO {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        const results = await global.db.collection(this.collection).find({}).toArray();
        console.log(results);
        return results;
    }
}

module.exports = GenericDAO;