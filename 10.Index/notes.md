### What does createIndex() do in detail?

Whilst we can't really see the index, you can think of the index as a simple list of values + pointers to the original document.

Something like this (for the "age" field):

(29, "address in memory/ collection a1")

(30, "address in memory/ collection a2")

(33, "address in memory/ collection a3")

The documents in the collection would be at the "addresses" a1, a2 and a3. The order does not have to match the order in the index (and most likely, it indeed won't).

The important thing is that the index items are ordered (ascending or descending - depending on how you created the index). createIndex({age: 1}) creates an index with ascending sorting, createIndex({age: -1}) creates one with descending sorting.

MongoDB is now able to quickly find a fitting document when you filter for its age as it has a sorted list. Sorted lists are way quicker to search because you can skip entire ranges (and don't have to look at every single document).

Additionally, sorting (via sort(...)) will also be sped up because you already have a sorted list. Of course this is only true when sorting for the age.


### Note
Mongo sorting is limited to 32 mb, soo it will time out, so index here is good for sorting and also for time consumption.


### query diagnosis

explain()

1. queryPlanner -  Show Summary for Executed Query + Winning Plan

2. executionStats - Show Detailed Summary for Executed Query + Winning Plan + Possibly Rejected Plans

3. allPlansExecution - Show Detailed Summary for Executed Query + Winning Plan + Winning Plan Decision Process



### Efficient queries

Measure with these

1. Milliseconds processing time

2. covered queries
    compared number of keys in the index
    how many documents are examined
    how many documents are returned

    here key and document examined should be almost same (or 0)
    document examined should be same as document returned (or 0)



## Winning plans by mongodb
1. Mongodb first tries to check different index and make emm to do the query

2. Choose the one with the fastest output queries

3. Cache that approach as the winning plans 

4. Cache will be available until the below happens
    Write threshold - 1000 (rewrite, add 1000 times)
    Index is rebuilt (index is deleted or new is created)
    Other Indexes is created or removed
    Mongodb server is restarted