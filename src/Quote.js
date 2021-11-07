import React, {Component} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

class Quote extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handeFav = this.handeFav.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.createQuery = this.createQuery.bind(this);

    }

    handeFav(e) {
        const {id} = e.target;
        this.props.toggleFavorite(id)
    }

    async handleAuthor(e) {
        console.log(e.target.innerText);
        await this.props.getAuthorQuotes(this.props.q.author);
    }

    createQuery(author) {
        return 'https://en.wikipedia.org/wiki/' + author;
    }

    render() {
        let {text, author, id, favorite} = this.props.q;
        author = author === null ? <i>Unknown</i> : author;
        const query = this.createQuery(author)
        return(
            <div >    
                <p>
                <Checkbox id={id} checked={favorite} onClick={this.handeFav} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    "{text}" -
                </p>
                <Tooltip title={<a target="_blank" rel="noreferrer" href={query}>`Learn about {author}`</a>} arrow>
                    <Button onClick={this.handleAuthor}>{author}</Button>
                </Tooltip>
            </div>
        )
    }
}

export default Quote;