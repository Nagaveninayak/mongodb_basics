/** Update One */

//$set --> remove the existing and add the new
//output --> matchedCount: shows the matched, modified count: modfied values
db.users.updateOne({ _id: ObjectId("5b9f707ead7ae74ebe5bc6c7") },
    {
        $set: {
            hobbies: [
                { title: "Sports", frequency: 5 }, { title: "Cooking", frequency: 3 }, { title: "Hiking", frequency: 1 }]
        }
    }
)

//add multiple fields using $set
db.users.updateOne({ _id: ObjectId("5b9f707ead7ae74ebe5bc6c7") },
    { $set: { age: 10, phone: 12345667 } }
)



/** Update Many */

//add the new field for all who have sports
db.users.updateMany({ "hobbies.title": "Sports" }, { $set: { isSporty: true } })



/** increment and decrement values */
//increment and decrement - $inc

//the below increment age by 2
db.users.updateOne({"name": "nav"}, {$inc: {age: 2}})

//the below decrement age by -1
db.users.updateOne({"name": "nav"}, {$inc: {age: -1}})

//combine increment with set
db.users.updateOne({name: "Manuel"}, {$inc: {age: 1}, $set: {isSporty: falsel}})



/** using min, max and mul operators */

// $min set the value (edit) only if the current value is greater than the min values (here age is 40)
//the below sets to 35
db.users.updateOne({name: "Manuel"}, {$min: {age: 35}})

// doesn't do anything
db.users.updateOne({name: "Manuel"}, {$min: {age: 23}})

// $max set the value (edit) only if the current value is lesser than the min values (here age is 35)
//the below doesn't update
db.users.updateOne({name: "Manuel"}, {$min: {age: 33}})

//the below updates the value
db.users.updateOne({name: "Manuel"}, {$min: {age: 38}})

//$mul --> multiple
db.users.updateOne({name: "Manuel"}, {$mul: {age: 2}})



/** drop the feilds  */
//$unset --> remove the feilds
//here empty string is ignored, you can add anything
db.users.updateMany({ "hobbies.title": "Sports" }, { $unset: { phone: ''} })



/** renaming fields */
//here age value is new field name
db.users.updateMany({}, {$rename: {age: "totalAge"}})



/** upsert */
//create document if not present or update if present
//filter value is added aka name is set in the below case
db.users.updateOne({ name: "Maria" },
    {
        $set: {
            age: 29, hobbies: [{ title: "Good food", frequency: 3 }],
            isSporty: true
        }
    }, { $upsert: true }
)