var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
		image: "http://localhost:3000/pics/IMG_2663.JPG",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa", 
		image: "http://localhost:3000/pics/IMG_2664.JPG",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor", 
		image: "http://localhost:3000/pics/IMG_2665.JPG",
		description: "blah blah blah"
	}
 ]

function seedDB(){
	// Remove all campgrounds
		Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("removed campground!");
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					// create a comment
					Comment.create(
						{
							text: "This place is great, but I wish there was internet.", 
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
							
						});
				}
			});
		});
	});
	
	// add a few comments
}

module.exports = seedDB;