/** quering array of objects using path embedded */
db.user.find({"address.state": "Gujarat"})



/** TODO: size */
// to find length of array (note it should match exact but not greater or lesser)
db.user.find({roles: {$size: 1}})



/** TODO: all */
//exact matches the array but the order doesn't matter
db.user.find({roles: {$all: ["admin", "user"]}})


/**TODO: elemMatch */
//this checks if the hobby have sports and frequency but not together in same object. Even is obj is different but have the values then it gives result
db.user.find({$and: [{"hobbies.title": "Sports"}, {"hobbies. frequency": {$gte: 3}}]}).pretty()

db.user.find({hobbies: {$eleMatch: {title: "Sports", frequency: {$gte: 3}}}}).pretty()



