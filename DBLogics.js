/**
 * Created by aryekoga on 21-May-16.
 */
var dbURL = 'mongodb://easyvol:easy1234@ds036069.mlab.com:36069/easy_vol'; // mongoDB URL to mLAB
var mongodb = require("mongodb"); // mongo module
var VOLUNTEERS_COLLECTION = "volunteers";
var db;
var url  = require('url');
var ObjectID = mongodb.ObjectID;

module.exports = {
    VOLUNTEERS_COLLECTION : VOLUNTEERS_COLLECTION,
    ConnectDB: ConnectDB,
    AddRecord: AddRecord,
    GetRecords: GetRecords,
    DeleteRecord: DeleteRecord
}


function ConnectDB(){
    var urlll = 'mongodb://admin:admin@ds017862.mlab.com:17862/itorerutdb';
    mongodb.MongoClient.connect(dbURL, function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = database;
        console.log("Database connection ready");
    });
}

// Add new record to the DB
function AddRecord(req, res, record) {
    var url_parts = url.parse(req.url);
    var collection = url_parts.query;
    db.collection(collection).insertOne(record, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
}

/*
Get records from db,
pattern:
 ?{?collection?:?volunteers?,?filter?:{}}"
*/

function GetRecords(req, res) {
    var url_parts = url.parse(req.url);
    var queryTemp = url_parts.query;//.replace(/\?/g,'\"');
    var query = JSON.parse(queryTemp);

    db.collection(query.collection).find(query.filter).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
}

function DeleteRecord(req, res, filter){
    var url_parts = url.parse(req.url);
    var collection = url_parts.query;

    var filterObj = {$or:[]};
    if(filter['ids[]'] instanceof Array){
        filter['ids[]'].forEach(function(item,index){
            filterObj.$or.push({_id: new ObjectID(item)});
        });
    }
    else{
        filterObj = {_id: new ObjectID(filter['ids[]'])}
    }


    db.collection(collection).remove(filterObj, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(204).end();
        }
    });
}

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}