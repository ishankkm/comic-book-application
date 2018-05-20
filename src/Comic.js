import React, {Component} from 'react';

class Comic extends Component {
  constructor (props) {
    super(props)
    
    this.data = props.comicData
    this.state = {
    }
  }

  render () {
    return (
      <img className="card-img" src={this.data.img} alt={this.data.alt}/>
    )
  }
}

export default Comic
