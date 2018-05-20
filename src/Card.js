import React, {Component} from 'react';
import Comic from './Comic';

class Card extends Component {
  constructor (props) {
    super(props)
    this.data = props.cardData
    this.state = {
    }
    this.getDate = this.getDate.bind(this)
  }

  getDate() {
    var event = new Date(this.data.created);
    return event.toDateString()
  }

  render () {
    return (
      <div className="card bg-light">
        <div className="card-header">{this.data.title}</div>

        <div className="card-body">
          <p className="card-text">{this.data.description.title}</p>
          <Comic source={this.data.description.img} comicData={this.data.description}/>
        </div>
        <div className="card-footer">
          <small className="text-muted">{this.getDate()}</small>
        </div>
      </div>
    )
  }
}

export default Card
