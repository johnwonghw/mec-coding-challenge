import React, { useEffect, useState } from 'react';
import Product from 'components/product';
import './search-page.scss';

export function useFetchSearchApi(location, searchQuery) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        if (searchQuery) {
            setIsLoading(true);
            const url = `http://www.mec.ca/api/v1/products/search?keywords=${searchQuery}`;
            fetch(url)
                .then(res => {
                    if (res.status >= 200 && res.status <= 299) {
                        return res.json();
                    } else {
                        throw new Error('Error fetching products')
                    }
                })
                .then(data => setProducts(data.products ? data.products : []))
                .catch(err => {
                    setProducts([]);
                    setError('Error retrieving products, please try again.')
                })
                .finally(() => setIsLoading(false))
        } else {
            setProducts([]);
        }
    }, [location, searchQuery]);

    return { products, isLoading, error }
}

export default function SearchPage({ location }) {
    const searchQuery = new URLSearchParams(location.search).get('key');
    const { products, isLoading, error } = useFetchSearchApi(location, searchQuery);
    let body;

    if (error) {
        body = error;
    } else if (isLoading) {
        body = `Searching for "${searchQuery}"`;
    } else if (!searchQuery) {
        body = 'Please use the search bar to search for products';
    } else if (!products.length) {
        body = `Could not find products for "${searchQuery}"`;
    } else {
        body = products.map(product => (
            <Product
                name={product.name}
                image={product.default_image_urls.main_image_url}
                key={product.product_code}
            />
        ))
    }

    return (
        <div className='search-page-container' data-testid='search-page-container'>
            {body}
        </div>
    )
}