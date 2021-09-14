import React, {Component} from 'react';
import axios from 'axios';
import Quote from './Quote';
import './Quote.css'


class QuotesList extends Component {
    constructor() {
        super()
        this.state = {
            starterIndex: 0,
            tenQuotes: null,
        }
        this.getTenQuotes = this.getTenQuotes.bind(this)
    }

    async getTenQuotes() {
        let allQuotes = await axios.get('https://type.fit/api/quotes');
        let tenQs = allQuotes.data.splice(this.state.starterIndex, 10);
        let updatedIndex = this.state.starterIndex + 10; 
        this.setState({tenQuotes: tenQs, starterIndex: updatedIndex})
    }

    async componentDidMount() {
        this.getTenQuotes()
    }

    render() {
        let allQuotes = this.state.tenQuotes === null ? 
            <p>Loading....</p> :
            this.state.tenQuotes.map(q => <Quote q={q}/>)
        return(
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">All Quotes</h1>
                    <button>Your Favorites</button>
                    <button className="JokeList-getmore" onClick={this.getTenQuotes}>Load More Quotes</button>
                </div>
                <ul className="JokeList-jokes">
                    {allQuotes}
                </ul>
            </div>
        )
    }
}

export default QuotesList;