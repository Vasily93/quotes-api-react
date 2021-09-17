import React, {Component} from 'react';
import axios from 'axios';
import Quote from './Quote';
import { v4 as uuidv4 } from 'uuid';
import './Quote.css'


class QuotesList extends Component {
    constructor() {
        super()
        this.state = {
            starterIndex: 0,
            tenQuotes: null,
            favorites: [],
            showFavs: false
        }
        this.getTenQuotes = this.getTenQuotes.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.showFavorites = this.showFavorites.bind(this);
    }

    async getTenQuotes() {
        let allQuotes = await axios.get('https://type.fit/api/quotes');
        let tenQs = allQuotes.data.splice(this.state.starterIndex, 10);
        tenQs.forEach(obj => {
            obj.id = uuidv4()
        });
        let updatedIndex = this.state.starterIndex + 10; 
        this.setState({tenQuotes: tenQs, starterIndex: updatedIndex})
    }

    addToFavorites(id) {
        const favorited = this.state.tenQuotes.find(q => q.id === id);
        let updatedState = this.state;
        updatedState.favorites.push(favorited);
        this.setState(updatedState)
    }

    showFavorites() {
        let updatedState = this.state;
        updatedState.showFavs = !updatedState.showFavs;
        this.setState(updatedState)
    }

    async componentDidMount() {
        this.getTenQuotes()
    }

    render() {
        let quotes = this.state.showFavs ? this.state.favorites : this.state.tenQuotes;
        let btnText = this.state.showFavs ? 'Show All' : 'Your Favorites';
        let quotesList = this.state.tenQuotes === null ? 
            <p>Loading....</p> :
            quotes.map(q => <li key={q.id}><Quote q={q} addToFavorites={this.addToFavorites}/></li>)
        return(
            <div className="QuoteList">
                <div className="QuoteList-sidebar">
                    <h1 className="QuoteList-title">All Quotes</h1>
                    <button onClick={this.showFavorites}>{btnText}</button>
                    <button className="QuoteList-getmore" onClick={this.getTenQuotes}>Load More Quotes</button>
                </div>
                <ul className="QuoteList-quotes">
                    {quotesList}
                </ul>
            </div>
        )
    }
}

export default QuotesList;