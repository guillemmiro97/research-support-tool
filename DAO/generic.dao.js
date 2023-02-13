class GenericDAO {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        const results = await global.db.collection(this.collection).find({}).toArray();
        console.log(results);
        return results;
    }

    async getDocumentByTitle(title) {
        const [results] = await global.db.collection(this.collection).find({ title: title }).toArray();
        return results;
    }

    async searchDocumentByTitle(title) {
        const results = await global.db.collection(this.collection).find({ title: { $regex: title, $options: 'i' } }).toArray();
        return results;
    }
}

module.exports = GenericDAO;