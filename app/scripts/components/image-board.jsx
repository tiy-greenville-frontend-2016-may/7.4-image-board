var React = require('react');


var ImageBoardView = React.createClass({
  getInitialState: function(){
    return {
      'displayForm': false,
      'url': '',
      'caption': ''
    };
  },
  componentWillMount: function(){
    this.props.images.on('add', this.update);
  },
  update: function(){
    this.forceUpdate();
  },
  handleFormToggle: function(e){
    this.setState({'displayForm': !this.state.displayForm});
  },
  handleNewImage: function(e){
    e.preventDefault();
    this.props.images.create({
      'url': this.state.url,
      'caption': this.state.caption
    });
  },
  handleUrlChange: function(e){
    this.setState({'url': e.target.value});
  },
  handleCaptionChange: function(e){
    this.setState({'caption': e.target.value});
  },
  render: function(){
    console.log('ImageBoardView');

    if(this.state.displayForm){
      var imageForm = (
        <form onSubmit={this.handleNewImage} className="col-md-12">
          <input onChange={this.handleUrlChange} type="text" name="url" placeholder="Image Url" />
          <input onChange={this.handleCaptionChange} type="text" name="caption" placeholder="Image Caption" />

          <input type="submit" className="btn btn-primary" value="Add Image" />
          <button className="btn btn-danger">Cancel</button>
        </form>
      );
    }else{
      var imageForm = '';
    }

    var imageListing = this.props.images.map(function(image){
      return (
        <section key={image._id} className="image-board col-md-offset-1 col-md-10">
          <div className="thumbnail">
            <img src={image.get('url')} alt="..." />
            <div className="caption">
              <h3>{image.get('caption')}</h3>
            </div>
          </div>
        </section>
      );
    });

    return (
      <div className="row">
        <nav className="col-md-12">
          <button onClick={this.handleFormToggle} className="img-circle"><i className="glyphicon glyphicon-plus-sign"/></button>
        </nav>

        {imageForm}

        {imageListing}

      </div>
    )
  }
});

module.exports = ImageBoardView;
