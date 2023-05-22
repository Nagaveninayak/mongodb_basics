/**
 * * Index is ordered list of the values
 * * every element has the pointer to the collection
 * * performance cost increases like for the insert operation
 * * index will also just look into the keys first and then fetches the collection
 */


/**
 * Adding single field index
 */

//analyse the query
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 60 } }); //8ms to ececute

//here one means ascending order and -1 is descending order
db.test_contacts.createIndex({ 'dob.age': 1})
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 60 } }); //6ms to ececute



/**
 * * Index restriction
 * * Use Index when your queries gives you 10% or 20% of the results
 */

// the below examined all the records and found all of emm matching
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 10 } }); //17ms to ececute

//drop index aka remove
db.test_contacts.dropIndex({'dob.age': 1});
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 10 } }); //10ms 