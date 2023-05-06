### Basic understand

1. db.myCollection.find({age: 32})
db --> access current database
myCollection --> access current collection
find --> Method
{age: 32} --> Equality / single value
age --> field
32 --> value

2. `db.myCollection.find({age: {$gte: 30}})`
`{age: {$gte: 30}}` --> Range filter
`$gte` --> operator, also reserved word



### Operators

1. Query Operator
Locate Data
`$eq`

2. Projection Operator
Modifiying for Data Presentation

3. Update Operator
Modifying + adding additional data
`$inc`



### Query Selectors && projection operators
 
Query Selectors
1. Comparison
2. Evaluation 
3. Logical
4. Array 
5. Element 
6. Comments 
7. Geospatial

Projection Opertors
1. $
2. $elemMatch
3. $meta
4. $slice



### Comparision operators
