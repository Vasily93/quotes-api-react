import React, {Component} from 'react';

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const {text, author} = this.props.q;
        return(
            <li className="Joke">
                <button className="Joke-buttons">♡</button>
                <p>
                    "{text}"
                    <big> - {author}.</big>
                </p>
            </li>
        )
    }
}

export default Quote;