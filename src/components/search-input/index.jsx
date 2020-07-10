import React from 'react';
import { withRouter } from 'react-router-dom';
import './search-input.scss';

function SearchInput({ history }) {
    return (
        <div className='search-input-container'>
            <input
                type='text'
                placeholder='Search...'
                className='search-input'
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        history.push({
                            pathname: '/search',
                            search: `key=${e.target.value}`
                        })
                    }
                }}
                data-testid='search-input'
            />
        </div>
    )
}

export default withRouter(SearchInput);