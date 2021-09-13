import React, {Component} from 'react';
import axios from 'axios';
import Quote from './Quote';

class QuotesList extends Component {
    constructor() {
        super()
        this.state = {
            quotes: null
        }
    }

    async componentDidMount() {
        let quotes = await axios.get('https://type.fit/api/quotes')
        console.log("QUOTES!!", quotes)
        this.setState({quotes: quotes.data})
    }

    render() {
        let allQuotes = this.state.quotes === null ? 
            <p>Loading....</p> :
            this.state.quotes.map(q => <Quote q={q}/>)
        return(
            <div>
                Quotes List Component
                <ul>
                    {allQuotes}
                </ul>
            </div>
        )
    }
}

export default QuotesList;