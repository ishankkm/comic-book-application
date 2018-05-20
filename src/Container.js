import React, {Component} from 'react';
import Card from './Card';

class Container extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

    this.buildCards = this.buildCards.bind(this)
  }

  buildCards(items) {
    var deck = [];

    items.forEach(function(item, i) {
      deck.push(
        <Card cardData={item} key={i} />
      )
    })

    this.setState({items: deck})
  }

  componentDidMount() {
    
    fetch("http://"+ window.location.hostname + ":5000")
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            items: []
          });
          this.buildCards(result.items)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render () {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="card-columns">{items}</div>
        </div>
      )
    }
  }
}

export default Container
