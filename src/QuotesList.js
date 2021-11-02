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
            allQuotes: null,
            favorites: [],
            showFavs: false
        }
        this.getAllQuotes = this.getAllQuotes.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.showFavorites = this.showFavorites.bind(this);
        this.isFavorited = this.isFavorited.bind(this);
    }

    async getAllQuotes() {
        let allQuotes = await axios.get('https://type.fit/api/quotes');
        let tenQs = allQuotes.data.splice(this.state.starterIndex, 10);
        tenQs.forEach(quote => {
            quote.id = uuidv4()
        });
        let updatedIndex = this.state.starterIndex + 10; 
        this.setState(state => state = {...state, allQuotes: tenQs, starterIndex: updatedIndex})
    }

    isFavorited(newQuote) {
        const doublcates = this.state.favorites.filter(q => q.text === newQuote.text);
        return doublcates.length > 0;
    }

    addToFavorites(id) {
        const favorited = this.state.allQuotes.find(q => q.id === id);
        console.log(this.isFavorited(favorited))
        if(this.isFavorited(favorited)) {
            const updated = this.state.favorites.filter(q => q.text !== favorited.text);
            this.setState(state => state = {...state, favorites: updated})
        } else {
            const updated = this.state.favorites;
            updated.push(favorited);
            this.setState(state => state = {...state, favorites: updated})
        }
    }

    showFavorites() {
        this.setState(state => state = {...state, showFavs: !this.state.showFavs})

    }

    async componentDidMount() {
        this.getAllQuotes()
    }

    render() {
        let quotes = this.state.showFavs ? this.state.favorites : this.state.allQuotes;
        let btnText = this.state.showFavs ? 'Show All' : `Your Favorites(${this.state.favorites.length})`;
        let quotesList = this.state.allQuotes === null ? 
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