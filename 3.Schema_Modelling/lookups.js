/** get all the books related to that author */

db.createCollection("authors")

db.authors.insertMany([
    {
        name: "Nav",
        gender: "female"
    },
    {
        name: "Tris",
        gender: "female"
    }
])

// {
//     "acknowledged" : true,
//     "insertedIds" : [
//             ObjectId("64563f9edd465afdf9ff2f3a"),
//             ObjectId("64563f9edd465afdf9ff2f3b")
//     ]
// }

db.books.insertMany([
    {
        title: "coding",
        authorId: ObjectId("64563f9edd465afdf9ff2f3a")
    },
    {
        title: "mongodb basics",
        authorId: ObjectId("64563f9edd465afdf9ff2f3a")
    },
    {
        title: "hypotisis",
        authorId: ObjectId("64563f9edd465afdf9ff2f3b")
    },
])

db.books.find().pretty()

db.authors.find().pretty()

/** show the books of authors in the author */
db.books.aggregate([
    {
        $lookup: {
            from: "authors",
            localField: "authorId",
            foreignField: "_id",
            as: "author"
        }
    }]).pretty()