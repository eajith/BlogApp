var mongoose   = require("mongoose"),
	campground = require("./models/campground"),
	comment    = require("./models/comment");


data = [
	{
		name : "Aruppukottai",
	   image : "https://free4kwallpapers.com/uploads/originals/2017/02/23/great-outdoors-camping--wallpaper.jpg",
	   description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name : "madurai",
	   image : "https://images5.alphacoders.com/555/thumb-1920-555700.jpg",
	   description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name : "chennai",
	   image : "https://wallpaperscraft.com/image/tent_camping_landscape_113547_1920x1080.jpg",
	   description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
]


function seedDb(){
	campground.remove({},function(err){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	data.forEach(function(seed){
	// 		campground.create(seed,function(err,campground){
	// 			if(err){
	// 				console.log(err);
	// 			}
	// 			else{
	// 				console.log("campground added");
	// 				//Adding comment
	// 				comment.create({
	// 					text : "THis is the nice place to live in",
	// 					author : "Elon MUSK"
	// 				},function(err, comment){
	// 					if(err){
	// 						console.log(err);
	// 					}else{
	// 						campground.comments.push(comment);
	// 						campground.save();
	// 						console.log("New comment created");
	// 					}
	// 				});
	// 			}
	// 		});
	// 	});
	 });
}



module.exports = seedDb;