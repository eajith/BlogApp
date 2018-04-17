var express= require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campground");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//show camgpround roture
router.get("/",function(req, res){
	console.log(req.user);
	campground.find({},function(err, campgroundList){
		if(err){
			console.log("Sorry error occured kinldy check");
		}else{
			res.render("campground/index",{camps: campgroundList,currentUser: req.user});
		}
	});
	
});

//creating post hadle route
router.post("/", middleware.isLoggedIn,function(req, res){

	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
	var newCamp = {name: name, price: price, image: image,author: author,description: desc,location:location, lat:lat,lng:lng};
    campground.create(newCamp,function(err, campground){
    	if(err){
    		console.log("Error occured have to check the code");
    	}else{
    		res.redirect("/campground");	
    	}
    });
    });
});

//new posts route
router.get("/new", middleware.isLoggedIn, something, function(req,res){
	res.render("campground/new");
});


function something(req, res, next){
	console.log("came here");
	return next();
}

//show a specific post route
router.get("/:id",function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err, showCampground){
		if(err){
			console.log(err);
		}else{
			console.log(showCampground);
			res.render("campground/show",{campground: showCampground});
		}
	});
	
});

router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
		campground.findById(req.params.id,function(err, campground){
			if(err){
				console.log("erer"+err);
			}else{
				res.render("campground/edit",{campground: campground});
			}
		});
});



// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newData = {name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, newData, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){Yosimite
			console.log(err);
		}else{
			res.redirect("/campground");
		}
	});
});


module.exports = router;