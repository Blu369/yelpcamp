var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
		image: "http://localhost:3000/pics/IMG_2663.JPG",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ipsum quibusdam, provident dolorum perspiciatis perferendis in impedit adipisci debitis eius quia soluta officiis? Voluptates dolorem soluta ad autem accusantium eius laborum unde. Maiores placeat voluptatum reiciendis dolore facilis nesciunt ipsum sequi in atque aut! Dolorem voluptates doloribus sit eveniet dolore porro amet dicta rem ea asperiores, eos obcaecati, quo blanditiis facilis. Obcaecati sit voluptatem ex ducimus minima tempora laborum magni beatae. Eum maxime perferendis iste vitae nemo molestias inventore quo fuga fugit. Soluta, perspiciatis. Numquam, sunt esse necessitatibus, nam, ex ad neque alias aspernatur quos repudiandae, cupiditate hic. Praesentium, beatae."
	},
	{
		name: "Desert Mesa", 
		image: "http://localhost:3000/pics/IMG_2664.JPG",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ipsum quibusdam, provident dolorum perspiciatis perferendis in impedit adipisci debitis eius quia soluta officiis? Voluptates dolorem soluta ad autem accusantium eius laborum unde. Maiores placeat voluptatum reiciendis dolore facilis nesciunt ipsum sequi in atque aut! Dolorem voluptates doloribus sit eveniet dolore porro amet dicta rem ea asperiores, eos obcaecati, quo blanditiis facilis. Obcaecati sit voluptatem ex ducimus minima tempora laborum magni beatae. Eum maxime perferendis iste vitae nemo molestias inventore quo fuga fugit. Soluta, perspiciatis. Numquam, sunt esse necessitatibus, nam, ex ad neque alias aspernatur quos repudiandae, cupiditate hic. Praesentium, beatae."
	},
	{
		name: "Canyon Floor", 
		image: "http://localhost:3000/pics/IMG_2665.JPG",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ipsum quibusdam, provident dolorum perspiciatis perferendis in impedit adipisci debitis eius quia soluta officiis? Voluptates dolorem soluta ad autem accusantium eius laborum unde. Maiores placeat voluptatum reiciendis dolore facilis nesciunt ipsum sequi in atque aut! Dolorem voluptates doloribus sit eveniet dolore porro amet dicta rem ea asperiores, eos obcaecati, quo blanditiis facilis. Obcaecati sit voluptatem ex ducimus minima tempora laborum magni beatae. Eum maxime perferendis iste vitae nemo molestias inventore quo fuga fugit. Soluta, perspiciatis. Numquam, sunt esse necessitatibus, nam, ex ad neque alias aspernatur quos repudiandae, cupiditate hic. Praesentium, beatae."
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