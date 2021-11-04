import React, {Component} from 'react';
import axios from 'axios';
import Quote from './Quote';
import { v4 as uuidv4 } from 'uuid';
import './Quote.css'


class QuotesList extends Component {
    constructor() {
        super()
        this.state = {
            allQuotes: JSON.parse(window.localStorage.getItem('allQuotes')),
            randomFive: [],
            currentList: 'random5',
            currentAuthor: null
        }
        this.getAuthorQuotes = this.getAuthorQuotes.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setIdAndFav = this.setIdAndFav.bind(this);
        this.checkDoubles = this.checkDoubles.bind(this);
        this.getRandomFive = this.getRandomFive.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.getQuoteById = this.getQuoteById.bind(this);
        this.showFavorites = this.showFavorites.bind(this);
        this.getFavIds = this.getFavIds.bind(this);
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

     getAuthorQuotes(author) {
        this.setState(state => state = {...state, currentList: 'author', currentAuthor: author})
    }

    getRandomFive() {
        const {allQuotes}  = this.state;
        const randomFive = [];
        while(randomFive.length < 5) {
            let randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length - 1)];
            randomFive.push(randomQuote.id)
        }
        this.setState(state => state = {...state, currentList: 'random5', randomFive: randomFive})
    }

    getQuoteById(id) {
        const quote = this.state.allQuotes.find(q => q.id === id);
        return quote;
    }

    toggleFavorite(id) {
        let quote = this.getQuoteById(id);
        quote.favorite = !quote.favorite;
        const updateQuotes = this.state.allQuotes.map(q => {
            if(q.id === quote.id) {
                q = quote;
            }
            return q;
        })
        this.setState(state => state = {...state, allQuotes: updateQuotes})
    }

    getFavIds(arr) {
        return arr.map(q => q = q.id)
    }

    showFavorites() {
        this.setState(state => state = {...state, currentList: 'favorites'})
    }

    async componentDidMount() {
        const QuotesData = await axios.get('https://type.fit/api/quotes');
        let allQuotes = QuotesData.data;
        allQuotes = this.setIdAndFav(allQuotes);

        this.setState(state => state = {...state, allQuotes: allQuotes});
        this.getRandomFive()

        if(!window.localStorage.allQuotes) {
            window.localStorage.setItem('allQuotes', JSON.stringify(this.state.allQuotes))
        }
    }

    componentDidUpdate() {
        console.log('updated')
        window.localStorage.favorites = JSON.stringify(this.state.favorites);   
    }

    render() {
        let list;
        switch(this.state.currentList) {
            case 'random5':
                list = this.state.randomFive;
                break;
            case 'favorites':
                list = this.state.allQuotes.filter(quote => quote.favorite === true).map(q => q = q.id);
                break;
            case 'author':
                list = this.state.allQuotes.filter(quote => quote.author === this.state.currentAuthor).map(q => q = q.id);
                break;
            default:
                list = this.state.randomFive;
        }

        let quotesList = this.state.allQuotes === null ? 
            <p>Loading....</p> :
            list.map(id => {
                let q = this.getQuoteById(id);
                return <li key={q.id}>
                            <Quote q={q} 
                                toggleFavorite={this.toggleFavorite}
                                getAuthorQuotes={this.getAuthorQuotes}
                            />
                        </li>
            })
        return( 
            <div className="QuoteList">
                <div className="QuoteList-sidebar">
                    <button className="QuoteList-getmore" onClick={this.showFavorites}>My Favorites</button>
                    <button className="QuoteList-getmore" onClick={this.getRandomFive}>Get Five Random Quotes</button>
                </div>
                
                <ul className="QuoteList-quotes">
                    {quotesList}
                </ul>
            </div>
        )
    }
}

export default QuotesList;