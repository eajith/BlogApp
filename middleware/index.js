var middlewareObj = {};
var campground = require("../models/campground");
var comment    = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err, campground){
			if(err){
				console.log("errrrrrrr"+err);
			}else{
				if(campground.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});

	}else{
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err, foundComment){
			if(err){
				req.flash("error","campground not found");	
				console.log("errrrrrrr"+err);
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Permission denied");	
					res.redirect("back");
				}
			}
		});

	}else{
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","please login first");
	res.redirect("/login");
}


module.exports = middlewareObj;