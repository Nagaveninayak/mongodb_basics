/** create db and insert the above */

db.flights.insertMany(
  [
    {
      "departureAirport": "MUC",
      "arrivalAirport": "SFO",
      "aircraft": "Airbus A380",
      "distance": 12000,
      "intercontinental": true
    },
    {
      "departureAirport": "LHR",
      "arrivalAirport": "TXL",
      "aircraft": "Airbus A320",
      "distance": 950,
      "intercontinental": false
    }
  ]
)

db.flights.find().pretty()

/** updateOne and updateMany needs $set to update */
db.flights.updateOne(
  { distance: 12000 },
  { $set: { toDelete: true } }
)

db.flights.deleteMany({ toDelete: true })

/** delete all the records */

db.flights.deleteMany({})

db.flightData.findOne({ distance: { $gt: 900 } })

/** update override the whole document */

db.flightData.update({ _id: - ObjectId("5b97882ce62da95ae64206ab") }, { delayed: false })



/** find */

db.flights.find().forEach((passengerData) => { printjson(passengerData) })
