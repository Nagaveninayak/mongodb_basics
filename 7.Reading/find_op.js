/** comparision operators */

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




/** Quering embedded */
db.movies.find({ "rating.average": { Sgt: 7 } }).pretty()


// check if exists in array
db.movies.find({ genres: "Drama" }).pretty()

// check if that particular array is present, like exact array
db.movies.find({ genres: ["Drama"] }).pretty()




/** either 30 or 42, includes  */
db.movies.find({ runtime: { $in: [30, 42] } }).pretty()


/** not 30 or 42, other than this  */
db.movies.find({ runtime: { $nin: [30, 42] } }).pretty()