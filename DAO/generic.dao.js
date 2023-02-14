class GenericDAO {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        const results = await global.db.collection(this.collection).find({}).toArray();
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

    async getDocumentByTag(tag) {
        const results = await global.db.collection(this.collection).find({ tags: { $regex: tag, $options: 'i' } }).toArray();
        return results;
    }

    async insert(data) {
        //check if journal already exists
        const [results] = await global.db.collection(this.collection).find({ title: data.title }, ).toArray();
        console.log(results);
        if(results) {
            return { acknowledged: "false", error: "Document already exists" };
        } else {
            const response = await global.db.collection(this.collection).insertOne(data);
            return response;
        }
    }

    async deleteDocumentByTitle(title) {
        const result = await global.db.collection(this.collection).deleteOne({ title: title });
        if (result.deletedCount === 1) {
            return { deleted: "true", response: "Document deleted" };
        } else {
            return { deleted: "false", error: "Document not deleted" };
        }
    }
}

module.exports = GenericDAO;