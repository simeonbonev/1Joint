

exports.index = function(req, res){
  res.render('index.jade', { title: '1Joint' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};
/*
 * GET home page.
 */

/*
*   LOGIN
*
*/
exports.login = function(db) {
    return function(req,res) {
        var email = req.body.username;
        var password = req.body.password;
        var collection = db.get('Users');
        collection.find({"email" : email, "password" : password},{}, function(e,docs) {
            if(docs.length == 0) {
                res.send('{"status" : "failure"}');
                console.log('INFO: login failed for ' + email + ':' + password +'.'); 
            } else {
                var user = docs[0];
                console.log('INFO: ' + user.email + ' logged in.');
                req.session.user = user.email;
                res.send('{"status" : "ok"}');
            }
        })
    }
}

exports.addFavourite = function(db) {
    return function(req, res) {
        console.log('One');
         var email = req.session.user;
         var collection = db.get('Users');
            console.log(req.body);
            console.log('Two');
            console.log(email);
         collection.find({"email" : email}, {}, function(e,docs) {
                var doc = docs.pop();
                var arr = doc.favourites;
                var flag = false;
                var result = new Array();
                while(arr.length > 0) {
                    var k = arr.pop();
                    console.log(k);
                    console.log(req.body.name);
                    if(k === req.body.name) {
                        flag = true;
                        break;
                    }
                    result.push(k);
                }

                console.log(flag);

                if(flag === false) {
                    console.log('vatre');
                    console.log(result);
                    result.push(req.body.name);
                    console.log(result);
                    doc.favorites = result;
                    console.log(doc);

                }
                console.log(email);
                collection.updateById(doc._id, doc, function() {});
         });


        //     var favs = docs[0].favourites;
        //     var flag = false;
        //     for(var i = 0; i < favs.length; i++) {
        //         if(favs[i] == req.body.name) {
        //             flag = true;
        //         }
        //     }
        //     if(flag == false) {
        //         var doc = docs[0];
        //         doc.favourites.push(req.body.name);
        //         collection.update({"email" : email}, doc, function() {});
        //     }
        // }
    };
}

exports.logout = function() {
    return function(req,res) {
        console.log('Logout was called');
        req.session=null;
        res.send('{"status" : "ok"}');
    }
}

 exports.getFavourites = function(db) {
     return function(req, res) {
         var email = req.session.user;
         console.log(email);
         var collection = db.get('Users');
         collection.find({"email" : email},{},function(e,docs) {
            if(docs.length == 0) {
                res.send({"status" : "ok"});
                console.log('then');
            }
            else {
                console.log('else');
                var entry = docs.pop();
                console.log(entry);
                console.log(entry.favorites);
                res.send({"favourites" : entry.favorites});
            }
         });
     }
}

exports.getPois = function(db){
    return function(req, res) {
        var poisArr = req.body.favourites;
        console.log(poisArr);
        var collection = db.get('POIs');
        var resultArr = new Array();
         collection.find({"name" : {$in : poisArr}}, {}, function(e, docs) {
            console.log(JSON.stringify(docs, null, 4));
            console.log("before sending");
            res.send({"result" : docs});
             });
        
    }
}

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('Users');
        collection.find({},{},function(e,docs){
            res.json( {
                "userlist" : docs
            });
        });
    };
};

exports.POIlist = function(db) {
    return function(req, res) {
        var collection = db.get('POIs');
        collection.find({},{},function(e,docs){
            res.json( {
                "POIlist" : docs
            });
        });
    };
};

exports.nonStopPharmacies = function(db) {
    return function(req, res) {
        var collection = db.get('POIs');
        collection.find({type: {$in:["pharmacy"]},workingHours:"00:00-24:00"},{},function(e,docs){
            res.json( {
                "nonStopPharmacies" : docs
            });
        });
    };
};

exports.countOfPlacesWithWiFi = function(db) {
    return function(req, res) {
        var collection = db.get('POIs');
        collection.find({other: {$in:["wifi"]}},{},function(e,docs){
            res.json( {
                "countOfPlacesWithWiFi" : docs.length
            });
        });
    };
};

exports.deleteGovernmentBuildings = function(db) {
    return function(req, res) {
        var collection = db.get('POIs');
        collection.remove({type: {$in:["government building"]}});
         res.redirect("POIlist");
         res.location("POIlist");
    };
};

exports.minus10seats = function(db) {
    return function(req, res) {
        var collection = db.get('POIs');
        collection.update({seating: {$exists:true}}, {$inc:{seating: -10}}, {multi:true});
         res.redirect("POIlist");
         res.location("POIlist");
    };
};


exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

exports.newPOI = function(req, res){
	res.render('newPOI', { title: 'Add New Point Of Interest'});
}

exports.adduser = function(db) {
    return function(req, res) {
        console.log("Function called");
        // Get our form values. These rely on the "name" attributes
        var email = req.body.email;
        var password = req.body.password;
        var favourites = req.body.favourites;
        
        var favs = favourites.split(',');
        	

        // Set our collection
        var collection = db.get('Users');

        // Submit to the DB
        collection.insert({
            "email" : email,
            "password" : password,
            "favourites" : favs
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, forward to success page
                res.redirect("userlist");
                // And set the header so the address bar doesn't still say /adduser
                res.location("userlist");
            }
        });

    }
}

exports.getNear = function(db) {
    return function(req,res) {
        console.log(JSON.stringify(req.body, null, 4));
        var collection = db.get('POIs');

        collection.find({"location" : {$near : [parseFloat(req.body.latitude),parseFloat(req.body.longitude)], $maxDistance: 1500}},{},function(e,docs) {
            console.log("Near result: " + JSON.stringify(docs, null, 4));
        });
    }
}


exports.addPOI = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var name = req.body.name;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var type = req.body.type.split(',');
        var workingHours = req.body.workingHours;
        	

        // Set our collection
        var collection = db.get('POIs');

        // Submit to the DB
        collection.insert({
            "name" : name,
            "location" : {
            	"latitude" : latitude,
            	"longitude" : longitude
            },
            "type" : type,
            "workingHours" : workingHours
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, forward to success page
                res.redirect("POIlist");
                // And set the header so the address bar doesn't still say /adduser
                res.location("POIlist");
            }
        });

    }
}
