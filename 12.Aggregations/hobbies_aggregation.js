[
    {
        "name": "Max",
        "hobbies": ["Sports", "Cooking"],
        "age": 29,
        "examScores": [
            { "difficulty": 4, "score": 57.9 },
            { "difficulty": 6, "score": 62.1 },
            { "difficulty": 3, "score": 88.5 }
        ]
    },
    {
        "name": "Manu",
        "hobbies": ["Eating", "Data Analytics"],
        "age": 30,
        "examScores": [
            { "difficulty": 7, "score": 52.1 },
            { "difficulty": 2, "score": 74.3 },
            { "difficulty": 5, "score": 53.1 }
        ]
    },
    {
        "name": "Maria",
        "hobbies": ["Cooking", "Skiing"],
        "age": 29,
        "examScores": [
            { "difficulty": 3, "score": 75.1 },
            { "difficulty": 8, "score": 44.2 },
            { "difficulty": 6, "score": 61.5 }
        ]
    }
]


db.array_test.aggregate([
    { $group: { _id: { age: "$age" }, hobbies: { $push: "$hobbies" } } }
]).pretty()



/** unwind - splits the document */
db.array_test.aggregate([
    { $unwind: "$hobbies" }
]).pretty()

db.array_test.aggregate([
    { $unwind: "$hobbies" },
    { $group: { _id: { age: "$age" }, hobbies: { $push: "$hobbies" } } }
]).pretty()



/** addToSet: avoid duplicate pushing into array */
db.array_test.aggregate([
    { $unwind: "$hobbies" },
    { $group: { _id: { age: "$age" }, hobbies: { $addToSet: "$hobbies" } } }
]).pretty()



/** get the first element from examscores using the slice */
db.array_test.aggregate([
    { $project: { _id: 0, examScores: { $slice: ["$examScores", 0, 1] } } }
]).pretty()



/** get the length of the array */
db.array_test.aggregate([
    { $project: { _id: 0, totalExam: { $size: "$examScores" } } }
]).pretty()



/** filter to filter the values array */
db.array_test.aggregate([
    {
        $project:
        {
            _id: 0,
            checkScores: { $filter: { input: "$examScores", as: "scores", cond: { $lte: ["$$scores.score", 60] } } }
        }
    }
]).pretty()



/** get the max score from each document */
db.array_test.aggregate([
    { $unwind: "$examScores" },
    { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" } },
    { $sort: { score: -1 } },
    { $group: { _id: "$_id", name: { $first: "$name" }, maxScore: { $max: "$score" } } },
    { $sort: { maxScore: -1 } }
]).pretty();
