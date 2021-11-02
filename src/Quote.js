import React, {Component} from 'react';

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handeFav = this.handeFav.bind(this)
    }

    handeFav(e) {
        this.props.addToFavorites(e.target.id)
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
                    <big> - {author}.</big>
                </p>
            </div>
        )
    }
}

export default Quote;