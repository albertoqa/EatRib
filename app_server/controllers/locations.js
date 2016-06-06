var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};

if(process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://murmuring-atoll-84614.herokuapp.com";
}

/* GET home page */
module.exports.homeList = function(req, res) {
  renderHomePage(req, res);
};

var renderHomePage = function(req, res) {
  res.render('locations-list', {
    title: 'EatRib - find a place to eat and drink',
    pageHeader: {
      title: 'EatRib',
      strapline: 'Find places to eat near you in Ribadesella'
    },
    sidebar: 'Looking for a place to drink and eat in Ribadesella? EatRib helps you find places to have fun and eat premium quality food. Perhaps with sider, beer or coffe? Let EatRib help you find the place you\'re looking for.',
  });
};

/* GET locations info page */
module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

var _showError = function(req, res, status) {
  var title, content;
  if(status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderDetailPage = function(req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: { title: locDetail.name},
    sidebar: {
      context: 'is on EatRib because it has fresh food and space to sit down with your friends and dring some beers and sider.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: locDetail
  });
};

var getLocationInfo = function(req, res, callback) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if(response.statusCode === 200) {
        data.coords = {
          lng : body.coords[0],
          lat : body.coords[1]
        };
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
}

/* GET add review page */
module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};

var renderReviewForm = function(req, res, locDetail) {
  res.render('location-review-form', {
    title: 'Review ' + locDetail.name + ' on EatRib',
    pageHeader: { title: 'Review ' + locDetail.name },
    error: req.query.err,
    url: req.originalUrl
  });
};

module.exports.doAddReview = function(req, res) {
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + "/reviews";
  postdata = {
    author : req.body.name,
    rating : parseInt(req.body.rating, 10),
    reviewText : req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if(!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if(response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        } else if(response.statusCode === 400 && body.name && body.name === "ValidationError") {
          res.redirect('/location/' + locationid + '/reviews/new?err=val');
        } else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};
