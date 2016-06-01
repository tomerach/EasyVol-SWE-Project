var express = require('express');
var index = require('./routes/index');
var mongodb = require("mongodb");
var assert = require('assert'); //unit tests
var bodyParser = require("body-parser");
var DBLogics = require("./DBLogics");
var url  = require('url');
var qs = require('querystring');
var ObjectID = mongodb.ObjectID;


var app = express();

/*
 *   server configuration
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/', index);


// Connect to the database before starting the application server.
DBLogics.ConnectDB();

// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});



// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contactsDB"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */


app.get("/GetRecord*", function(req, res) {
  DBLogics.GetRecords(req,res);
});

app.post("/UpdateRecord*", function(req, res) {
  //var newRecord = req.body;
  //DBLogics.AddRecord(req, res, newRecord);
  var body = "";
  req.on('data', function (data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      req.connection.destroy();
  });

  req.on('end', function () {
    var newRecord = qs.parse(body);
    DBLogics.UpdateRecord(req, res, newRecord);
  });
});

app.post("/AddRecord", function(req, res) {
  //var newRecord = req.body;
  //DBLogics.AddRecord(req, res, newRecord);
  var body = "";
  req.on('data', function (data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      req.connection.destroy();
  });

  req.on('end', function () {
    var newRecord = qs.parse(body);
    DBLogics.AddRecord(req, res, newRecord);
  });
});

app.post("/DeleteRecord", function(req, res) {
  var body = "";
  req.on('data', function (data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      req.connection.destroy();
  });

  req.on('end', function () {
    var filter = qs.parse(body);
    DBLogics.DeleteRecord(req, res,filter);
  });


});

/*  "/contactDB/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contactDB/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/contactDB/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/contactDB/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(204).end();
    }
  });
});

/*  "/listsDB"
 *    GET: finds all lists
 *    POST: creates a new list
 *    PUT: update list by id
 *    DELETE: deletes list by id
 */

app.get("/listsDB", function(req, res) {
  db.collection(LISTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get lists.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/listsDB", function(req, res) {
  var newList = req.body;
  db.collection(LISTS_COLLECTION).insertOne(newList, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new list.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.put("/listsDB", function(req, res) {
  var updateDoc = req.body;
  var id = updateDoc._id;
  delete updateDoc._id;

  db.collection(LISTS_COLLECTION).updateOne({_id: new ObjectID(id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update list");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/listsDB/:id", function(req, res) {
  db.collection(LISTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete list");
    } else {
      res.status(204).end();
    }
  });
});


// all other routes direct to index.
app.get('*', index);