import React, {Component} from 'react';

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handeFav = this.handeFav.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
    }

    handeFav(e) {
        this.props.addToFavorites(e.target.id)
    }

    async handleAuthor(e) {
        console.log(e.target.innerText);
        await this.props.getAuthorQuotes(this.props.q.author);
    }

    render() {
        let {text, author, id, favorite} = this.props.q;
        author = author === null ? <i>Unknown</i> : author ;
        let like = favorite ? "❤" : "♡";
        return(
            <div className="Quote" >    
                <button className="Quote-buttons"
                    onClick={this.handeFav}
                    id={id}
                >{like}</button>

                <p>
                    "{text}"
                    <big onClick={this.handleAuthor}> - {author}.</big>
                </p>
            </div>
        )
    }
}

export default Quote;