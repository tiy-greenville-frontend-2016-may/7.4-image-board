var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var ImageCollection = require('./models/images');
var ImageBoardView = require('./components/image-board.jsx');


$(function(){
  var imageCollection = new ImageCollection();

  ReactDOM.render(
    React.createElement(ImageBoardView, {images: imageCollection}),
    document.getElementById('app')
  );
    
  imageCollection.fetch();
});
