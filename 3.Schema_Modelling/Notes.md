### schema

schema is the structure that contains the feilds and the value

Mongodb is schemaless aka schema (structure) can be mixed

But schema is necessary for the efficiancy 



### Modeling the database

1. Which Data does my App need 
Defines your required

2. Where do I need my Data?
Defines the Fields you'll need Information, Orders, ... or generate? (and how they relate)

3. Which kind of Data or Information do I want to display?
Defines which queries you'll need
                                                            
4. How often do I fetch my data?
Defines whether you should optimize for easy fetching

5. How often do I write or change?
Defines whether you should optimize for easy



### lookup

1. Merge the collection in one go

4 thing in lookup

1. from --> from which other collection you need to releate document

2. localFeild --> In the main collection where is this from id is present

3. foreignField --> which key is matched in the form collection

4. as --> allias