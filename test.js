var gh = require('ghtest.js');

var projects;
var calobj;

gh.readprojects('projects.json',function(data){
    projects = data;
})

gh.synccalendar('oehokie',function(data){
    calobj = JSON.parse(data);
    /*
    fs.writeFile('./public/ghcal.json', data, function (err) {
        if (err) throw err;
        console.log('Calendar saved!');
    });
    */
    
    gh.synccommits(projects,function(data){
        projects = data;
        gh.writeprojects('newprojects.json',projects,function(done){console.log(done);});
    })

});