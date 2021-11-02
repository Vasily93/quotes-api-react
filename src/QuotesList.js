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
            favorites: JSON.parse(window.localStorage.getItem('favorites')) || [],
            showFavs: false,
            currentAuthor: null
        }
        this.getAllQuotes = this.getAllQuotes.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.showFavorites = this.showFavorites.bind(this);
        this.isFavorited = this.isFavorited.bind(this);
        this.getAuthorQuotes = this.getAuthorQuotes.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setIdAndFav = this.setIdAndFav.bind(this);
        this.checkDoubles = this.checkDoubles.bind(this);
    }

    handleClose() {
        this.setState(state => state = {...state, currentAuthor: null})
    }

    setIdAndFav(arr) {
        let modifiedArr = arr.map(quote => {
            quote.id = uuidv4();
            quote.favorite = false;
            return quote;
        })
        return modifiedArr;
    }

    checkDoubles(newArr, exsistingArr) {
        exsistingArr.map(fav => ( 
            newArr.forEach(q => {
                if(q.text === fav.text) {
                    q.id = fav.id
                    q.favorite = true
                }
            })
        ))
        return newArr;
    }

    async getAuthorQuotes(author) {
        const allQuotes = await axios.get('https://type.fit/api/quotes');
        let authorQuotes = allQuotes.data.filter(q => q.author === author);
        authorQuotes = this.setIdAndFav(authorQuotes);
        authorQuotes = this.checkDoubles(authorQuotes, this.state.allQuotes);
        authorQuotes = this.checkDoubles(authorQuotes, this.state.favorites);
        this.setState(state => state = {...state, currentAuthor: authorQuotes})
    }

    async getAllQuotes() {
        const allQuotes = await axios.get('https://type.fit/api/quotes');
        let tenQs = allQuotes.data.splice(this.state.starterIndex, 10);
        tenQs = this.setIdAndFav(tenQs);
        tenQs = this.checkDoubles(tenQs, this.state.favorites);
        let updatedIndex = this.state.starterIndex + 10; 
        this.setState(state => state = {...state, allQuotes: tenQs, starterIndex: updatedIndex})
    }

    isFavorited(newQuote) {
        const doublcates = this.state.favorites.filter(q => q.text === newQuote.text);
        return doublcates.length > 0;
    }

    addToFavorites(id) {
        const favorited = this.state.allQuotes.find(q => q.id === id) 
            || this.state.favorites.find(q => q.id === id)
            || this.state.currentAuthor.find(q => q.id === id)

        if(this.isFavorited(favorited)) {
            favorited.favorite = false; 
            const updated = this.state.favorites.filter(q => q.text !== favorited.text);
            this.setState(state => state = {...state, favorites: updated})
        } else {
            const updated = this.state.favorites;
            favorited.favorite = true;
            updated.push(favorited);
            this.setState(state => state = {...state, favorites: updated})
        }
    }

    showFavorites() {
        this.setState(state => state = {...state, showFavs: !this.state.showFavs})
    }

    async componentDidMount() {
        this.getAllQuotes();
        if(!window.localStorage.favorites) {
            window.localStorage.setItem('favorites', JSON.stringify(this.state.favorites))
        }
    }

    componentDidUpdate() {
        window.localStorage.favorites = JSON.stringify(this.state.favorites);   
    }

    render() {
        let quotes = this.state.showFavs ? this.state.favorites : this.state.allQuotes;
        quotes = this.state.currentAuthor === null ? quotes : this.state.currentAuthor;

        let btnText = this.state.showFavs ? 'Show All' : `Your Favorites(${this.state.favorites.length})`;
        let author = this.state.currentAuthor !== null ? <li><h4>All Quotes by {this.state.currentAuthor[0].author}  </h4></li> : null;
        let closeBtn = this.state.currentAuthor !== null ? <button onClick={this.handleClose}>Close</button> : null;

        let quotesList = this.state.allQuotes === null ? 
            <p>Loading....</p> :
            quotes.map(q => <li key={q.id}><Quote q={q} addToFavorites={this.addToFavorites} getAuthorQuotes={this.getAuthorQuotes}/></li>)
        return( 
            <div className="QuoteList">
                <div className="QuoteList-sidebar">
                    <h1 className="QuoteList-title">All Quotes</h1>
                    <button onClick={this.showFavorites}>{btnText}</button>
                    <button className="QuoteList-getmore" onClick={this.getAllQuotes}>Load More Quotes</button>
                </div>
                
                <ul className="QuoteList-quotes">
                    {author}
                    {quotesList}
                </ul>
                {closeBtn}
            </div>
        )
    }
}

export default QuotesList;