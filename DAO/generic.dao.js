class GenericDAO {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        try {
            const results = await global.db.collection(this.collection).find({}).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDocumentByTitle(title) {
        try {
            const [results] = await global.db.collection(this.collection).find({ title: title }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async searchDocumentByTitle(title) {
        try {
            const results = await global.db.collection(this.collection).find({ title: { $regex: title, $options: 'i' } }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDocumentByTag(tag) {
        try {
            const results = await global.db.collection(this.collection).find({ tags: { $regex: tag, $options: 'i' } }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDocumentsByTags(data) {
        /*{"tags": [
            "Engineering",
            "Education",
            "Research"
        ]}*/

        console.log(data.tags);
        try {
            const results = await global.db.collection(this.collection).find({ tags: { $all: data.tags } }).toArray();
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
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
        try {
            const result = await global.db.collection(this.collection).deleteOne({ title: title });
            if (result.deletedCount === 1) {
                return { deleted: "true", response: "Document deleted" };
            } else {
                return { deleted: "false", error: "Document not deleted" };
            }
        } catch (error) {
            console.error(error);
            return { deleted: "false", error: error };
        }
    }
}

module.exports = GenericDAO;