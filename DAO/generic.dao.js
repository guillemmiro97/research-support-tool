class GenericDAO {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        const [results] = await global.db.collection(this.collection).find().toArray();
        return results;
    }
}

module.exports = GenericDAO;