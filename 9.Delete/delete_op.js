/** delete one */
db.users.deleteOne({ name: "nav" });


/** delete many */
//delete based on the condition
db.users.deleteMany({ totalAge: { $gt: 30 }, isSporty: true })
db.users.deleteMany({ totalAge: { $exists: false }, isSporty: true })



/** delete all entries in collection */
db.users.deleteMany({})

// alternate - this drops entire collection
db.users.drop()

// delete the entire database
db.dropDatabase()