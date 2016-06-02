/* GET about page */
module.exports.about = function(req, res) {
  res.render('generic-text', {
    title: 'About EatRib',
    content: 'EatRib was created to help people find places to eat good food and drink cold sider.\n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan.'
  });
};
