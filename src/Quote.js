import React, {Component} from 'react';

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const {text, author} = this.props.q;
        return(
            <li>
                <p>{text}</p>
                <p>{author}</p>
            </li>
        )
    }
}

export default Quote;