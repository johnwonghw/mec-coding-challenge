import React from 'react';
import { withRouter } from 'react-router-dom';
import './search-input.scss';

function SearchInput({ history }) {
    return (
        <div className='search-input-container'>
            <input
                type='text'
                placeholder='Search...'
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        history.push(`/search?key=${e.target.value}`)
                    }
                }}
            />
        </div>
    )
}

export default withRouter(SearchInput);