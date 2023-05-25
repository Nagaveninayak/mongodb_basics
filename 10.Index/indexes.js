/**
 * * Index is ordered list of the values
 * * every element has the pointer to the collection
 * * performance cost increases like for the insert operation
 * * index will also just look into the keys first and then fetches the collection
 * * index doesn't do much change if the returned data is too much
 */


/**
 * Adding single field index
 */

//analyse the query
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 60 } }); //8ms to ececute

//here one means ascending order and -1 is descending order
db.test_contacts.createIndex({ 'dob.age': 1 })
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 60 } }); //6ms to ececute




/**
 * * Index restriction
 * * Use Index when your queries gives you 10% or 20% of the results
 */

// the below examined all the records and found all of emm matching
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 10 } }); //17ms to ececute

//drop index aka remove
db.test_contacts.dropIndex({ 'dob.age': 1 });
db.test_contacts.explain("executionStats").find({ 'dob.age': { $gt: 10 } }); //10ms 




/**
 * *Compound index
 */
// this gives half the collection, this index doesn't helpful
db.test_contacts.createIndex({ gender: 1 });
db.test_contacts.dropIndex({ gender: 1 });

//index with two fields
//the below creates one index, where there is pair of age and gender, like 33 male (whose age is 20)
db.test_contacts.createIndex({ "dob.age": 1, gender: 1 });

// the below search based on age --> gender
// this is INDEX scan
db.test_contacts.explain().find({ "dob.age": 35, gender: 'male' });

// this is INDEX scan
db.test_contacts.explain().find({ "dob.age": 35 });

// this is Collection scan, cuz can't look into second alone
db.test_contacts.explain().find({ gender: 'male' });





/**
 * Index for sorting
 */
// sort using compound index
db.test_contacts.explain().find({ 'dob.age': 35 }).sort({ gender: 1 })




/**
 * Default index
 */
db.test_contacts.getIndexes();



/**
 * Configuring Indexes
 */
//if there are two email with same then, the bwlow gives error
db.test_contacts.createIndex({ email: 1 }, { unique: true });



/**
 * Partial Filters
 */
// rarely used index queries, create partial index that you use rarely
// store elements greater than 60
db.test_contacts.createIndex({ 'dob.age': 1 }, { parialFilterExpression: { "dob.age": { $gt: 60 } } })

// store partial elements where gender is male
// index size is smaller since only male is stored along with age
db.test_contacts.createIndex({ 'dob.age': 1 }, { parialFilterExpression: { gender: 'male' } });

// this does index scan + collection scan, since we didn't specified age
db.test_contacts.find({ 'dob.age': { $gte: 60 } })

// this does index scan
db.test_contacts.find({ 'dob.age': { $gte: 60 }, gender: 'male' });



/**
 * PArtial Index
 */
db.users.insertMany([{ name: "Max", email: "max@test.com" }, { name: "Manu" }])

db.users.createIndex({ email: 1 }, { unique: true });

// this will fail since the unique is false, manu and nav have same index
db.users.insertOne({ name: 'Nav' });

// this will avoid the error while email is not present
db.users.createIndex({ email: 1 }, { unique: true, parialFilterExpression: { email: { $exists: true } } })

// works
db.users.insertOne({ name: 'Nav' });

// gives error since the email should be unique
db.users.insertOne({ name: 'Nav', email: "max@test.com" });




/**
 * TTL - time to live index
 */
db.sessions.insertOne({ data: "dksafkjel", createdAt: new Date() })

// noraml ascending index
db.sessions.createIndex({ createdAt: 1 });

// index time, delete the record after 10s
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });

// the first record will be there since it is added before index
db.sessions.insertOne({ data: "11", createdAt: new Date() });

// after 10s, both will be deleted
// adding new element will trigger the expire index
// also the TTL index doesn't work on compound index




/**
 * covered queries
 */
db.customers.insertMany([{ name: "Max", age: 29, salary: 3000 }, { name: "Manu", age: 30, salary: 4000 }])

// index had one value aka the name here
db.customers.createIndex({ name: 1 });

// here is returned only indexed values, here the document examined will be 0, This is covered state
db.customers.explain("executionStats").find({ name: "Max" }, { _id: 0, name: 1 })



/**
 * Mongodb rejecting plan
 */
// in query order doesn't matter, while in compound index order matters
db.customers.createIndex({ name: 1 });

db.customers.createIndex({ age: 1, name: 1 });

//here two index are created
db.customers.examine().find({ age: { $gt: 20 }, name: 'Max' });
// the above gives two plans, winning and losing
// winning for the compound index since it fits the above find criteria 
// lose for the single index search by name

//here gives bunch output with detail stastics 
db.customers.examine('allPlansExecution').find({ age: { $gt: 20 }, name: 'Max' });




/**
 * Using multi key indexes
 */
db.contacts.insertOne({ name: "Max", hobbies: ["Cooking", "Sports"], addresses: [{ street: "Main Street" }, { street: "Second Street" }] })
  