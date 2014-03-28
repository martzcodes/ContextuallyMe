var gh = require('github.js');
var async = require('async');
var moment = require('moment');
var fs = require('fs');
var config = require('./config.js');

exports.readprojects = function(file,cb) {
	var projects;
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) throw err;
		projects = JSON.parse(data);
		cb(projects);
	});
}

exports.writeprojects = function(file,projects,cb) {
	fs.writeFile(file, projects, function (err) {
		if (err) throw err;
		cb('done');
	});
}

exports.synccommits = function(projects,cb) {
	async.series([function(){
		projects.forEach(function(group){
			group.repos.forEach(function(repo){
				var ghobj = {
					author:group.author,
					repo:repo.name,
					auth:config.githubauth
				}
				if (repo.since){
					ghobj.since = repo.since;
				}
				gh.commits(ghobj,function(data){
					//console.log(data);
					if (repo.data) {
						repo.data.push(data);
					} else {
						repo.data = data;
					}
					repo.since = moment().format('YYYY-MM-DDTHH:MM:SS')+'Z';
				})
			})
		})},
	function(){
		cb(projects);
	}])
}

exports.synccalendar = function(author,cb) {
	var ghobj = {
		author:author,
		auth:config.githubauth
	}
	gh.calendar(ghobj,function(data){
		cb(data);
	})
}

exports.heat = function(projects) {
	projects.forEach(function(group){
		group.repos.forEach(function(repo){
			//
		})
	})	
}