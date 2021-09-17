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
        const {text, author, id} = this.props.q;
        return(
            <div className="Quote" >
                <button className="Quote-buttons"
                    onClick={this.handeFav}
                    id={id}
                >♡</button>

                <p>
                    "{text}"
                    <big> - {author}.</big>
                </p>
            </div>
        )
    }
}

export default Quote;