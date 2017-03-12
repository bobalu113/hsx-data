import * as fs from 'fs';
import request from 'request';
import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';

const MongoUrl = 'mongodb://webuser:password@ds145359.mlab.com:45359/hsx-stats';
const HSXSearch = 'http://www.hsx.com/search/?status=ALL&type=1&action=submit_nav&keyword=';

MongoClient.connect(MongoUrl, (err, db) => {
  let collection = db.collection('movies');
  collection.find({}).toArray((err, movies) => {
    if (movies.length == 0) {
      let movies = [ ];
      fs.readFile('movies.txt', (err, data) => {
        let lines = data.toString().split('\n');
        for (let line of lines) {
          let values = line.split('\t');
          let lockIn = new Date();
          let lockInParts = values[4].split('/');
          lockIn.setMonth(lockInParts[0]);
          lockIn.setDate(lockInParts[1]);
          lockIn.setYear(lockInParts[2]);
          movies.push({
            'title': values[0],
            'category': values[2],
            'lockIn': lockIn.toISOString(),
            'wiki': values[6]
          });
        }
        collection.insertMany(movies, (err, result) => {
          collection.createIndex({ 'lockIn': 1 }, null, (err, result) => {
            console.log(err);
          });
        });
      });
    }
  });
});

var app = express();
app.use(express.static('public'));

app.get('/movies', (req, res, next) => {
  let query = { };
  if ('category' in req.query) {
    query.category = req.query.category;
  }
  let lockIn = { };
  if ('startLockIn' in req.query) {
    lockIn['$gte'] = req.query.startLockIn;
  }
  if ('endLockIn' in req.query) {
    lockIn['$lte'] = req.query.endLockIn;
  }
  if (Object.keys(lockIn).length) {
    query.lockIn = lockIn;
  }
  MongoClient.connect(MongoUrl, (err, db) => {
    let collection = db.collection('movies');
    collection.find(query).toArray((err, movies) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(movies));
      res.end();
    });
  });
});

app.get('/movie/:id', (req, res, next) => {
  MongoClient.connect(MongoUrl, (err, db) => {
    let collection = db.collection('movies');
    collection.find({ '_id': new ObjectID(req.params.id) }).toArray((err, movies) => {
      let respond = movie => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(movie));
        res.end();
      }
      if (movies.length > 0) {
        if ('refresh' in req.query) {
          refreshMovie(movies[0], movie => {
            movie.refresh = new Date().toISOString();
            collection.updateOne({ '_id': new ObjectID(req.params.id) }, {
              $set: movie
            }, (err, result) => {
              respond(movie);
            });
          });
        } else {
          respond(movies[0]);
        }
      } else {
        res.status(404);
        res.end();
      }
    });
  });
});

app.listen(8082);


function refreshMovie(movie, callback) {
  if (movie.hsxUrl) {
    request(movie.hsxUrl, (error, resp, body) => {
      Object.assign(movie, parseBody(body));
      callback(movie);
    })
  } else {
    searchMovie(movie.title, hsxUrl => {
      if (hsxUrl) {
        movie.hsxUrl = hsxUrl;
        let urlParts = hsxUrl.split('/');
        movie.hsxSymbol = urlParts[urlParts.length - 1];
        refreshMovie(movie, callback);
      } else {
        callback(movie);
      }
    });
  }
}

function searchMovie(title, callback) {
  let keyword = title.replace("\s+", "+");
  request(HSXSearch + keyword, (error, resp, body) => {
    callback(resp.request.href);
  });
}

function parseBody(body) {
  var matches;
  var result = { };

  const summaryRE = /<div class="security_summary">[\s\S]*?<p class="value">H\$([\d\.]+)<span class="(.*?)">H\$([\d\.]+)\s+\(([\d\.]+)\%\)/g;
  matches = summaryRE.exec(body);
  if (matches) {
    result.currentValue = parseFloat(matches[1]);
    if (matches[2] == "up") {
      result.trend = parseFloat(matches[3]);
      result.trendPercent = parseFloat(matches[4]);      
    } else {
      result.trend = -parseFloat(matches[3]);
      result.trendPercent = -parseFloat(matches[4]);      
    }
  }

  const holdingsRE = /<div class="holdings_summary">[\s\S]*?Shares Held Long on HSX: <span [^>]*>([\d\,]+)<\/span>[\s\S]*?Shares Held Short on HSX: <span [^>]*>([\d\,]+)<\/span>[\s\S]*?Trading Volume on HSX \(Today\): <span [^>]*>([\d\,]+)<\/span>[\s\S]*?<\/div>/g;
  matches = holdingsRE.exec(body);
  if (matches) {
    result.heldLong = parseInt(matches[1].replace(/,/g, ''));
    result.heldShort = parseInt(matches[2].replace(/,/g, ''));
    result.volume = parseInt(matches[3].replace(/,/g, ''));
  }

  const pricesRE = /<tr>[\s\S]*?<td>This (\w+)<\/td>[\s\S]*?<td><span class="up">H\$([\d\.]+)<\/span><\/td>[\s\S]*?<td><span class="down">H\$([\d\.]+)<\/span><\/td>[\s\S]*?<\/tr>/g;
  while (matches = pricesRE.exec(body)) {
    switch (matches[1]) {
      case "Week":
        result.weekHigh = parseFloat(matches[2]);
        result.weekLow = parseFloat(matches[3]);
        break;
      case "Month":
        result.monthHigh = parseFloat(matches[2]);
        result.monthLow = parseFloat(matches[3]);
        break;
      case "Season":
        result.seasonHigh = parseFloat(matches[2]);
        result.seasonLow = parseFloat(matches[3]);
        break;
      case "Year":
        result.yearHigh = parseFloat(matches[2]);
        result.yearLow = parseFloat(matches[3]);
        break;
    }
  }

  console.log(result);
  return result;
}