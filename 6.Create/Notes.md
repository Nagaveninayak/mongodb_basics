### create the document

1. insertOne() 
db.collectionName.insertOne({field: "value"})

 
2. insertMany()
db.collectionName.insertMany ([
{field: "value"},
{field: "value"}
])


3. insert() --> flexible, can insert one and many
db.collectionName.insert()


Link `https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/`



### ordered insert

If one fails in the middle of bulk update, the previous documents would be still added but the later documents will be not added

Overwrite: 

Add the new document which configures the ordered, set this to false to override the default behaviour



### write concern

Mongodb server --> storage engine (which writes) --> Memory and store in Disk

{w: 1, j: undefined}
w --> accept write and write on disk
j --> journel, kept for the operations (like todo). Also acts a backup todo list
Journel performance is not heavy and complex. so writing directly on the disk is not recommended

{w: 1, j: true}
Tell me once it is written

{w: 1, wtimeout: 200, j: true}
Report before the time 



### Atomicity

The transaction success as a whole or fail as a whole

Its document level, if in a document it is not possible it is added id, name but not hobby