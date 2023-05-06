/** insertOne */

db.persons.insertOne({ name: "Max", age: 30, hobbies: ["Sports", "Cooking"] })


/** insertMany */

db.persons.insertMany([{ name: "Maria", age: 31 }, { name: "Chris", age: 25 }])


/** insert */
/** insert gives different response aka it doesn't give you the id */
db.persons.insert({ name: "chris", age: 34 })

db.persons.insert([{ name: "Maria", age: 31 }, { name: "Chris", age: 25 }])



/** ordered insert */

db.hobbies.insertMany([{ _id: "sports", name: "Sports" }, { _id: "cooking", name: "Cooking" }, { _id: "cars", mame: "Cars" }])

/** will break */
db.hobbies.insertMany([{ _id: "yoga", name: "yoga" }, { _id: "cooking", name: "Cooking" }, { _id: "books", mame: "books" }])

/** will not break */
db.hobbies.insertMany([{ _id: "yoga_test1", name: "yoga test" }, { _id: "cooking", name: "Cooking" }, { _id: "books", mame: "books" }], { ordered: false })

db.hobbies.find().pretty()




/** write concerns */

//0 -- gives aknowldge false, aka no id and information result
db.persons.insertOne({ name: "Chrissy", age: 41 }, { writeConcern: { w: 0 } });

//aknowlegde
db.persons.insertOne({ name: "Chrissy", age: 41 }, { writeConcern: { w: 0 } });

// no security in case of server down
db.persons.insertOne({ name: "Michael", age: 51 }, { writeConcern: { w: 1, j: false } })

// security and takes more time, makes todo for this insert
db.persons.insertOne({ name: "Michael", age: 51 }, { writeConcern: { w: 1, j: true } })

// will skip if the time is over
db.persons.insertOne({ name: "Aliya", age: 22 }, { writeConcern: { w: 1, j: true, wtimeout: 1 } })
