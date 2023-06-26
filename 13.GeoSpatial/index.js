/** geolocation has the follow pattern: {type: 'point', coordinates: ['longitude', 'latitude']} */
db.places.insertOne({
  name: "Califorina Academy of Sciences",
  location: { type: "Point", coordinates: [-122.4724356, 37.7672544] },
});

/** Running Geo Query */
// coordinated return longitude and latitude
// checking if the coordinates is near or not
// the below will give you error need to add geo index
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-122.471114, 37.771104] },
    },
  },
});

/** Geospatial index */
// this add index
db.places.createIndex({ location: "2dsphere" });

// near with min and max distance
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-122.471114, 37.771104] },
    },
    $maxDistance: 500,
    $minDistance: 10,
  },
});

/** adding additional location */
db.places.insertOne({
  name: "Conservatory of Flowers",
  location: { type: "Point", coordinates: [-122.4615748, 37.7701756] },
});


/** Finding Places Inside certain Area */
// example to create a bunch of cordinates
const p1 = [-122.4547, 37.77473]
const p2 = [-122.45303, 37.76641]
const p3 = [-122.51026, 37.76411]
const p4 = [-122.51088, 37.77131]

// here p1 is starting and ending to indicate the polygon
//below query gives the list of records present within this polygon
db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});



/** Finding out if user is inside the given area */

// create a record for the polygon
db.areas.insertOne({
  name: "Golden Gate Park",
  area: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
});

//create index
db.areas.createIndex({area: "2dsphere"})

// geointeresects --> return a common area
// will get result only if there is a area inside the polygon
// here coordinates is of user
db.areas.find({
  area: {
    $geoIntersects: {
      $geometry: { type: "Point", coordinates: [-122.49089, 32.13333] },
    },
  },
});


/** certain radius */
// centersphere - get circle around point (takes array --> first array aka coordinates, second is radius (should be in radian))
// here coordinates of the center of circle you want to draw
db.places.find({
  location: {
    $geoWithin: { $centerSphere: [[-122.46203, 37.77286], 1 / 6378.1] },
  },
}).pretty();
