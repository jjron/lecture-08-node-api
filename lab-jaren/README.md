Lab-08 & 09 Node REST API using HTTP module and file system storage
===
Implement a rest API and use persistent data

## Description
A REST API for games on an HTTP server that users can make POST, GET, PUT, and DELETE requests to with appropriate routes and responses. For this description all distinct game objects are referred to as items. The data is persistent because it gets saved in the data directory instead of session memory. This allows data to be accessed between server sessions.
##### Modules
- **server.js** -- starts the server and creates an instance of a router for the games API
- **game.js** -- item constructor that assigns a unique id to each game and takes user input data for:
  - title ** required for POST*
  - genre ** required for POST*
  - developer ** required for POST*
  - publisher
  - platforms
  - ESRB rating
  - release date
- **parse-body.js** -- parses the JSON body of a POST or PUT request and returns the values for each item property
- **router.js** -- constructor function for an instance of a router that manages requests to GET, POST, PUT, and DELETE methods
- **storage.js** -- storage for item data; stores each item by item type and id
-**game-router.js** -- creates routes for doing create, read, and delete operations on items

## Usage
- On the command line, type `node server.js` and the server will be up on port 3000 unless indicated otherwise.
- To add a new game to the API, type in a POST request, filling the empty quotes with your data:
  - `http POST :3000/api/games title="" genre="" developer="" publisher="" platforms="" ratingESRB="" releaseDate=""`
  - The server will respond with a `200 OK` status and return the new item data. Note the unique id.
  - If you get `400 Bad Request` that means you didn't fill out all the properties.
- To read a game that exists in the API, make a GET request with the game's unique id:
  - *use the id from the POST request's response*
  - `http GET :3000/api/games?id=*id here*`
  - `200 OK` -- successful request
  - `400 Bad Request` -- you forgot to add the unique id
  - `404 Not Found` -- the game with the id you supplied does not exist in the API's storage
- To delete a game from the API, make a DELETE request with the game's unique id:
  - `http DELETE ::3000/api/games?id=*id here*`
  - `204 No Content` -- the game data has been successfully removed
  - `400 Bad Request` -- you forgot to add the unique id
  - `404 Not Found` -- the game with the id you supplied already does not exist in the API's storage
