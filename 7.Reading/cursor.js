/** TODO: next */

const cursor = db.user.find()
cursor.hasNext(); // check if there is a element
cursor.next(); //gives one lement
cursor.forEach(doc => printjson(doc)) //prints all the elements 
