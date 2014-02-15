
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.jade', { title: '1Joint' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

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
// exports.getFavourites = function(db) {
//     return function(req, res) {
//         var email = req.body.email;
//         var collection = db.get('Users');
//         collection.find({"email" : email}, {}, function(e,docs) {
//             if(docs.length == 0) {
//                 res.send('{"status" : "failure"}');
//             }
//             else {
//                 var favourites = docs[0].favourites;
//                 var result = new Array();
//                 for(var i = 0; i <  favourites.length; i++) {
//                     var s = favourites[i];
//                     var curCol = db.get('POIs');
//                     curCol.find({"name" : s},{}, function(e,docs) {
//                         if(docs.length > 0) {
//                             result.push(docs[0]);
//                         }
//                     });
//                 }
//                 console.log(result);
//                res.send(result);  
//             }
//         };
//     };
// }; 
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
