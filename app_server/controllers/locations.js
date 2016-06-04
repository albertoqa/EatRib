var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};

if(process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://murmuring-atoll-84614.herokuapp.com";
}

/* GET home page */
module.exports.homeList = function(req, res) {
  var requestOptions, path;
  path = '/api/locations';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json: {},
    qs : {
      lng : -0.9690884,
      lat: 51.455041
      //maxdist : 20
    }
  };
  console.log("Creating request", requestOptions);

  request(
    requestOptions,
    function(err, response, body) {
      renderHomePage(req, res, body);
    }
  );
};

var renderHomePage = function(req, res, responseBody) {
  res.render('locations-list', {
    title: 'EatRib - find a place to eat and drink',
    pageHeader: {
      title: 'EatRib',
      strapline: 'Find places to eat near you in Ribadesella'
    },
    sidebar: 'Looking for a place to drink and eat in Ribadesella? EatRib helps you find places to have fun and eat premium quality food. Perhaps with sider, beer or coffe? Let EatRib help you find the place you\'re looking for.',
    locations: responseBody
  });
};

/* GET locations info page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', {
    title: 'La Guía',
    pageHeader: { title: 'La Guía'},
    sidebar: {
      context: 'is on EatRib because it has fresh food and space to sit down with your friends and dring some beers and sider.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: {
      name: 'La Guía',
      address: 'C/ Jesus Delago 18, 33560, Ribadesella',
      rating: 4,
      facilities: ['Sea Food', 'Sider', 'Anchoas'],
      coords: {lat: 51.455041, lng: -0.9690884},
      openingTimes: [{
        days: 'Monday - Friday',
        opening: '7.00am',
        closing: '7.00pm',
        closed: false
      }, {
        days: 'Saturday',
        opening: '8.00am',
        closing: '5.00pm',
        closed: false
      }, {
        days: 'Sunday',
        closed: true
      }],
      reviews: [{
        author: 'Pablo Quesada',
        rating: 5,
        timestamp: '01 July 2016',
        reviewText: 'What a great place. I can\'t say enough good things about it'
      }, {
        author: 'Lola Aranda',
        rating: 4,
        timestamp: '02 July 2016',
        reviewText: 'It was good but the sider was not as cold as expected.'
      }]
    }
   });
};

/* GET add review page */
module.exports.addReview = function(req, res) {
  res.render('location-review-form', {
    title: 'Review La Guía on EatRib',
    pageHeader: { title: 'Review La Guía'}
    });
};
