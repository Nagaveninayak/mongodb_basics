/** update matched array elements */
// find a obj in array where obj is { title: "Sports", frequency: { $gte: 3 } }
// set the new key without changing, here we use $set with . to set it
// hobbies.$ refers to the filtered hobbies
db.users.updateMany({
    hobbies:
        { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } }
},
    { $set: { "hobbies.$.highFrequency": true } }
)



/** updating all array elements */
// to check and update all the object key in the array
// here $[] means for each loop update
db.users.updateMany({totalAge: {$gte: 30}}, {$inc: {"hobbies.$[].frequency": -1}})




/**finding and updating specific fields*/
// the below gives all the fields whose value is greater 2
// but we need to update those object whose frequency is greater than 2
db.users.find({"hobbies.frequency": {$gte: 2}})




/** adding elements to Array */
// push - add new elements to the array without deleting other elements
db.users.updateOne({ name: "nav" }, { $push: { hobbies: { title: "books", frequency: 2 } } })

// push multiple document
// here each, will add the 2 elements to the array and sort add it in the way frequency is greater
db.users.updateOne({ name: "nav" },
    {
        $push:
        {
            hobbies:
            {
                $each: [{ title: "books", frequency: 1 }, { title: "anime", frequency: 5 }],
                $sort: { frequency: -1 }
            }
        }
    }
)




/** removing elements from arrays */
// pull -- pull elements based on conditions
// the below will remove the books element from the array
db.users.updateOne({name: "nav"}, {$pull: {hobbies: {title: "books"}}})

//delete the last element
db.users.updateOne({name: "nav"}, {$pop: {hobbies: 1}})




/** addToSet */
//works with adding one element, (use instead of push)
// addToSet - adds unique value only aka not add the below books element again
db.users.updateOne({ name: "nav" }, { $addToSet: { hobbies: { title: "books", frequency: 2 } } })