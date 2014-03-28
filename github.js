var https = require('https');
var fs = require('fs');

/**
 * HOW TO Make an HTTP Call - GET
 */
// options for GET
var optionsget = {
    host : 'api.github.com', // here only the domain name
    // (no http/https !)
    port : 443,
    headers:{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'},
    method : 'GET' // do GET
};

exports.commits = function(inputdata, cb) {
    var githuboptions = optionsget;
    githuboptions.path = '/repos/'+inputdata.author+'/'+inputdata.repo+'/commits?author='+inputdata.author;
    githuboptions.auth = inputdata.auth;
    if (inputdata.since) {
        githuboptions.path = githuboptions.path + '&since=' + inputdata.since;
    }
    // do the GET request
    var reqGet = https.request(githuboptions, function(res) {
        console.log("statusCode: ", res.statusCode);
        var content = "";
     
        res.on('data', function (chunk) {
            content += chunk;
        });
        res.on('end', function () {
            var output = [];
            var jsoncontents = JSON.parse(content);
            jsoncontents.forEach(function(jsoncontent){
                output.push({
                    date:jsoncontent.commit.committer.date,
                    message:jsoncontent.commit.message,
                })
            })
            cb(output);
        });
     
    });
     
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
}

exports.calendar = function(inputdata, cb) {
    var githuboptions = optionsget;
    githuboptions.host = 'github.com';
    githuboptions.path = '/users/'+inputdata.author+'/contributions_calendar_data';
    if (inputdata.auth) {
        githuboptions.auth = inputdata.auth;
    }
    if (inputdata.since) {
        githuboptions.path = githuboptions.path + '&since=' + inputdata.since;
    }
    // do the GET request
    var reqGet = https.request(githuboptions, function(res) {
        console.log("statusCode: ", res.statusCode);
        var content = "";
     
        res.on('data', function (chunk) {
            content += chunk;
        });
        res.on('end', function () {
            cb(content);
        });
     
    });
     
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
}