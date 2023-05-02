### JSON and BSON

Mongodb uses BSON, it takes JSON and converts into BSON

_id can be automatically generated or can be manually added


### SOME POINTS

1. A database contains collection which contains the document

2. You can create a new Database in MongoDB by using `use Database_Name` command.

3. You can check currently selected database, using the command `show dbs`.

4. `db.dropDatabase()` the command is used to drop an existing database. 

5. `db.myCollection.drop()` to get rid of a single collection in a database

6. `cls` clear terminal

7. `$` indicates reserved word

    
### Create

insertOne (data, options)

insertMany (data, options)

                              
### Update

updateOne (filter, data, options)

updateMany (filter, data, options)

replaceOne (filter, data, options)


### Read

find(filter, options)      

findOne (filter, options)


### Delete

deleteOne (filter, options)

deleteMany (filter, options)


### create documents in collections 

1. `db.collection.insertOne()`	It is used to insert a single document in the collection. 
Accept one object

2. `db.collection.insertMany()`	It is used to insert multiple documents in the collection.
Accept array of objects

3. `db.createCollection()`	It is used to create an empty collection.

4. `db.collection.find()`	It is used to retrieve documents from the collection.


### update documents in collections

1. `db.collection.updateOne()`	It is used to update a single document in the collection that satisfy the given criteria.
```json 
db.student.updateOne({name: 'test1'}, {$set: {age: 23}})
```

2. `db.collection.updateMany()`	It is used to update multiple documents in the collection that satisfy the given criteria.

3. `db.collection.replaceOne()`	It is used to replace single document in the collection that satisfy the given criteria.


### delete the documents

1. `db.collection.deleteOne()`	It is used to delete a single document from the collection that satisfy the given criteria.

2. `db.collection.deleteMany()`	It is used to delete multiple documents from the collection that satisfy the given criteria.



### it command

find command gives cursor object but not all the data

cursor object has more meta data, which shows more data on click (like pagination)

findOne doesn't uses pretty, cuz it has one document soo doesn't use cursor

insert, create doesn't have cursor 



### projection

second argument for find is the projection

projection is mainly used to fetch data in the way you need

_id: 0 makes the id not included ( 1 means included )



### Embedded Documents

nested documents are possible, upto 100 nesting is possible for a document

Max document size should be below 16mb


