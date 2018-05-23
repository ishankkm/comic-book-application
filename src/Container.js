import React, {Component} from 'react';
import Card from './Card';

class Container extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      comic: "xkcd"
    }

    this.buildCards = this.buildCards.bind(this)
    this.fetchItems = this.fetchItems.bind(this)
    this.changeComic = this.changeComic.bind(this)
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
      this.fetchItems("xkcd")
  }

  fetchItems(type){
    fetch("http://"+ window.location.hostname + ":5000/" + type)
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            items: [],
            comic: type
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

  changeComic(e) {
    console.log(e.target.id);
    this.fetchItems(e.target.id)
  }

  render () {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="">Comics</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-secondary" id="xkcd" type="button" onClick={this.changeComic}>XKCD</button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-secondary" id="smbc" type="button" onClick={this.changeComic}>SMBC</button>
                </li>
              </ul>
            </div>
          </nav>
        <div className="container">
          <div className="card-columns mt-3">{items}</div>
        </div>
      </div>
      )
    }
  }
}

export default Container
