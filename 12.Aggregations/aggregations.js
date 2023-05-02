/**
 * match - filters
 */
db.students.aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } }
]).pretty();


/** Sort (sort can be at anywhere */
db.students.aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
    { $sort: { totalPersons: -1 } }
]).pretty()


db.persons.aggregate([
    { $match: { 'dob.age': { $gt: 50 } } },
    {
        $group: {
            _id: { gender: '$gender' },
            numPersons: { $sum: 1 },
            avgAge: { $avg: '$dob.age' }
        }
    },
    { $sort: { numPersons: -1 } }
]).pretty();


/**
 * project -- transform the data
 * In below we are trandforming name to take first letter as captial
 * _id: 0 --> don't take id
 */

db.students.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            fullName: {
                $concat: [
                    { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
                    { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
                    " ",
                    "$name.last"
                ]
            }
        }
    }
]).pretty()



/**
 * transform coordinates to array and type numbers
 */

db.students.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            email: 1,
            name: 1,
            location: {
                type: "point",
                coordinates: [
                    { $convert: { input: "$location.coordinates.latitude", to: "double" } },
                    { $convert: { input: "$location.coordinates.longitude", to: "double" } },
                ]
            }
        }
    },
    {
        $project: {
            gender: 1,
            location: 1,
            email: 1,
            fullName: {
                $concat: [
                    { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
                    { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
                    " ",
                    { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
                    { $substrCP: ["$name.last", 1, { $subtract: [{ $strLenCP: "$name.last" }, 1] }] },
                ]
            }
        }
    }
]).pretty()


/***
 * Age and birthday to be at top level
 */

db.students.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            email: 1,
            name: 1,
            dob: 1,
            location: {
                type: "point",
                coordinates: [
                    { $convert: { input: "$location.coordinates.latitude", to: "double" } },
                    { $convert: { input: "$location.coordinates.longitude", to: "double" } },
                ]
            }
        }
    },
    {
        $project: {
            gender: 1,
            email: 1,
            name: 1,
            birthDate: { $convert: { input: "$dob.date", to: "date" } },
            age: "$dob.age",
            location: 1,
        }
    },
    {
        $project: {
            gender: 1,
            location: 1,
            email: 1,
            birthDate: 1,
            age: 1,
            fullName: {
                $concat: [
                    { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
                    { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
                    " ",
                    { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
                    { $substrCP: ["$name.last", 1, { $subtract: [{ $strLenCP: "$name.last" }, 1] }] },
                ]
            }
        }
    },
    { $group: { _id: { birthYear: { $isoWeekYear: "$birthDate" } }, count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]).pretty()



/**
 * * GROUP - n:1 - calculation, sum, avg etc
 * * PROJECT - 1:1 - transform
 */