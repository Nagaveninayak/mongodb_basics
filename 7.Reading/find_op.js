/** TODO: comparision operators */

// equal operator
db.movies.find({ runtime: { Seq: 60 } })

// not equal
db.movies.find({ runtime: { $ne: 60 } })

//lower or lesser
db.movies.find({ runtime: { Slt: 60 } })

//greater
db.movies.find({ runtime: { Sgt: 60 } })

//lower than and equal
db.movies.find({ runtime: { Slte: 60 } })

//greater than and equal
db.movies.find({ runtime: { Sgte: 60 } })




/** TODO: Quering embedded */
db.movies.find({ "rating.average": { Sgt: 7 } }).pretty()


// check if exists in array
db.movies.find({ genres: "Drama" }).pretty()

// check if that particular array is present, like exact array
db.movies.find({ genres: ["Drama"] }).pretty()




/** either 30 or 42, includes  */
db.movies.find({ runtime: { $in: [30, 42] } }).pretty()


/** not 30 or 42, other than this  */
db.movies.find({ runtime: { $nin: [30, 42] } }).pretty()





/** TODO: or, nor */

// gives everything that is greater than 7 and less than 10
db.show.find({ $or: [{ "rating.average": { $gte: 7 } }, { "rating.average": { $lt: 10 } }] }).pretty()

// gives everything that is less than 7 and greater than 10
db.show.find({ $nor: [{ "rating.average": { $gte: 7 } }, { "rating.average": { $lt: 10 } }] }).pretty()



/** TODO: and */

// find average rating greater than 7 plus genres involving anime
db.show.find({ $and: [{ "rating.average": { $gte: 7 } }, { genres: "Anime" }] }).pretty()

// note the following does the exact same thing as the above
// mongo default concats the filters
db.show.find({ "rating.average": { $gte: 7 }, genres: "Anime" }).pretty()

// but the same key search will give you incorrect results if you don't use $and
db.show.find({ genres: "Drama", genres: "Horror" }).count()
23

db.show.find({ genres: "Horror" }).count()
23

db.show.find({ Sand: [{ genres: "Drama" }, { genres: "Horror" }] }).count()
17



/** TODO: not */
db.show.find({ runtime: { $not: { $eq: 60 } } }).count()
70

db.show.find({ runtime: { $ne: 60 } }).count()
70




/** TODO: Element Operations */
db.users.insertMany([
    {
        name: "Max",
        hobbies: [
            { title: "Sports", frequency: 3 },
            { title: "Cooking", frequency: 6 }
        ],
        phone: "0131782734"
    },
    {
        name: "Manuel",
        hobbies: [
            { title: "Cooking", frequency: 5 },
            { title: "Cars", frequency: 2 }
        ],
        phone: "812177972",
        age: 30
    }
])

// is age present 
db.users.find({ age: { $exists: true } }).pretty()

// give all results where age is not present
db.users.find({ age: { $exists: false } }).pretty()

db.users.insertMany([
    {
        name: "Nav",
        hobbies: [
            { title: "Sports", frequency: 3 },
            { title: "Cooking", frequency: 6 }
        ],
        phone: "0131782734",
        age: null
    }
])

// here in the above if you type $exists true will give even null values
// this gives age present and age not null
db.users.find({ age: { $exists: true, $ne: null } }).pretty()



/** TODO: type operator */

// by default number is stored as double in mongodb
//below both are same
db.users.find({ phone: { $type: "number" } }).pretty()

db.users.find({ phone: { $type: "double" } }).pretty()

//array of types to match
db.users.find({ phone: { $type: ["number", "string"] } }).pretty()



/** TODO: Regex operator */

//finding text snippets
// using regex 
db.show.find({ summary: { $regex: "comedy" } }).pretty()



/** TODO: Expression */
db.sales.insertMany([
    { volume: 100, target: 120 },
    { volume: 89, target: 80 },
    { volume: 200, target: 177 }
])

// access where volume is greater than target