/** show only names */
db.passengers.find({}, { _id: 0, name: 1 }).pretty()


/** embedded documents */
/** here {} means consider for all without any filters*/
/** here we have two embedded documents*/
db.flights.updateMany({}, {
    $set: {
        status: {
            title: "arrived",
            time: new Date(),
            details: {
                description: "Arrived on time"
            }
        }
    }
})

/** array type */
db.flights.updateMany({}, {
    $set: {
        color: ["blue", "green"]
    }
})


/** output the data array */
db.flights.findOne({ name: "Albert Twostone" }).hobbies

db.flights.find({ hobbies: "blue" }).pretty()

/** output the objects */
db.flights.find({ "status.title": "arrived" }).pretty()

db.flights.find({ "status.details.description": "Arrived on time" }).pretty()