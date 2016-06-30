var React = require('react');


var ImageCreateForm = React.createClass({
  getInitialState: function(){
    return {
      'url': '',
      'caption': ''
    };
  },
  componentWillReceiveProps: function(newProps){
    console.log(this.props);
    console.log(newProps);
  },
  getDefaultProps: function(){
    return {
      'displayForm': false
    }
  },
  handleUrlChange: function(e){
    this.setState({'url': e.target.value});
  },
  handleCaptionChange: function(e){
    this.setState({'caption': e.target.value});
  },
  handleNewImage: function(e){
    e.preventDefault();
    console.log(this.props.images);
    this.props.images.create({
      'url': this.state.url,
      'caption': this.state.caption
    });
  },
  render: function(){
    // if the form should not display, bail
    if(!this.props.displayForm){
      return <div />
    }

    return (
      <form onSubmit={this.handleNewImage} className="col-md-12">
        <input onChange={this.handleUrlChange} type="text" name="url" placeholder="Image Url" />
        <input onChange={this.handleCaptionChange} type="text" name="caption" placeholder="Image Caption" />

        <input type="submit" className="btn btn-primary" value="Add Image" />
        <button className="btn btn-danger">Cancel</button>
      </form>
    );
  }
});

var NavBar = React.createClass({
  render: function(){
    return (
      <nav className="col-md-12">
        <button onClick={this.props.handleFormToggle} className="img-circle"><i className="glyphicon glyphicon-plus-sign"/></button>
      </nav>
    );
  }
});


var ImageBoardView = React.createClass({
  getInitialState: function(){
    return {
      'displayForm': false
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
  render: function(){
    console.log('ImageBoardView');

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
        <NavBar handleFormToggle={this.handleFormToggle}/>

        <ImageCreateForm images={this.props.images} displayForm={this.state.displayForm}/>

        {imageListing}

      </div>
    )
  }
});

module.exports = ImageBoardView;
