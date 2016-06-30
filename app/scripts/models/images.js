var Backbone = require('backbone');

var ImageModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults : {
    'url': '',
    'caption': ''
  }
});

var ImageCollection = Backbone.Collection.extend({
  model: ImageModel,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/dansimages'
});

module.exports = ImageCollection;
