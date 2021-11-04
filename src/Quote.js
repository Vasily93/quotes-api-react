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
    }

    handeFav(e) {
        const {id} = e.target;
        this.props.toggleFavorite(id)
    }

    async handleAuthor(e) {
        console.log(e.target.innerText);
        await this.props.getAuthorQuotes(this.props.q.author);
    }

    render() {
        let {text, author, id, favorite} = this.props.q;
        author = author === null ? <i>Unknown</i> : author ;
        return(
            <div className="Quote" >    
                <Checkbox id={id} checked={favorite} onClick={this.handeFav} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />

                <p>
                    "{text}" -
                    <Tooltip title={<a href='aha'>`All quotes by ${author}`</a>} arrow>
                        <Button onClick={this.handleAuthor}>{author}</Button>
                    </Tooltip>
                </p>
            </div>
        )
    }
}

export default Quote;