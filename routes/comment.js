var express = require("express");
var router  = express.Router({mergeParams : true});
var middleware = require("../middleware");
var campground = require("../models/campground");
var comment    = require("../models/comment");


//New comment
router.get("/new", middleware.isLoggedIn,function(req, res){
	campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	});
	
});

//comments create
router.post("/", middleware.isLoggedIn,function(req, res){
	campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
		}else{
			comment.create(req.body.comment,function(err, comment){
				if(err){
					console.log(err);
					res.redirect("/camground");
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","successfully added comment");
					res.redirect("/campground/"+campground._id);
				}
			});
		}
	});

});

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req, res){
	comment.findById(req.params.comment_id,function(err,comment){
		if(err){
			console.log(err);
		}else{
			req.flash("success","comment edited successfully");
			res.render("comments/edit",{campground_id: req.params.id, comment: comment});
		}
	});
	
});

router.put("/:comment_id",function(req, res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campground/"+req.params.id);
		}
	});
});

router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment successfully deleted");
			res.redirect("/campground/"+req.params.id);
		}
	});
});
//middleware


module.exports = router;