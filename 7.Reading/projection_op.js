/** Projection: modify the data to display the way you want */

//schedule is a object with multiple key values, the below gives only time key
db.movies.find({}, {name: 1, genres: 1, runtime: 1, rating: 1, "schedule.time": 1}).pretty()

//genres, fetch the first match
db.movies. find({genres: "Drama"}, {"genres.$": 1}).pretty()

// gives output id and the array that has drama and horror and project horror
db.movies.find({genres: "Drama"}, {genres: {$elemMatch: {$eq: "Horror"}}}).pretty()



/** slice */
db.movies. find({genres: "Drama"}, {genres: {$slice: 2}}).pretty()

//skip the first value
db.movies. find({genres: "Drama"}, {genres: {$slice: [1, 2]}}).pretty()