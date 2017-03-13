var db = require("./models");


var eventData = [];
eventData.push({
          eventName: 'JavaScript For Beginners'
          description: 'Learn javascript fundamentals',
          location: 'San Francisco, California',
          category: 'Javascript', //dropdown menu with pre-made selections
          date: '2017, March 23',
          time: '1:00pm',
          externalResource: 'www.Stackoverflow.com' , //show as links
          imageUrl: 'http://www.b2bweb.fr/wp-content/uploads/js-logo-badge-256.png',
          keywords: ['javascript', 'san francisco', 'beginners', 'code', 'front end', 'developer', ] //searchable
        });
eventData.push({
          eventName: 'Learn HTML & CSS'
          description: 'Learn the structure of web design',
          location: 'Berkeley, California',
          date: '2017, May 17',
          time: '9:00am',
          imageUrl: 'https://uploads.toptal.io/blog/category/logo/364/CSS.png',
          keywords: ['html', 'bay area', 'beginners', 'code', 'front end', 'developer', 'css', 'web design', 'style'] //searchable
        });
eventData.push({
          eventName: 'Technical Interview Prep'
          description: 'Get a better understanding of Javascript, different interview strategies, and considerations',
          location: 'San Jose, California',
          category: 'Javascript', //dropdown menu with pre-made selections
          date: '2017, April 20',
          time: '4:20pm',
          externalResource: 'www.codeacademy.com', //show as links
          imageUrl: 'http://farm6.static.flickr.com/5215/5493668169_4683cb1a03_m.jpg',
          keywords: ['logic', 'algorithms', 'bay area', 'berkeley', 'javascript', 'interview', 'code', 'front end', 'developer', 'job', 'strategy'] //searchable
        });


db.Event.remove({}, function(err, events) {
  db.Event.create(eventsList, function(err, events) {
    if (err) {  return console.log('ERROR', err);  }
    console.log("all events:", events);
    console.log("created", events.length, "events");
    process.exit();
  }); //closes create function
}); //closes remove function
