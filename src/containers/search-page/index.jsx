import React, { useEffect, useState } from 'react';
import Product from 'components/product';
import './search-page.scss';

export default function SearchPage({ location }) {
    const searchQuery = new URLSearchParams(location.search).get("key");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        if (searchQuery) {
            setIsLoading(true);

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const url = `http://www.mec.ca/api/v1/products/search?keywords=${searchQuery}`;

            fetch(proxyUrl + url)
                .then(res => {
                    if (res.status >= 200 && res.status <= 299) {
                        return res.json()
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
            setProducts([])
        }
    }, [location]);

    if (error) {
        return <div>{error}</div>
    } else if (isLoading) {
        return <div>Searching for "{searchQuery}"</div>
    } else if (!searchQuery) {
        return <div>Plase use the search bar to search for products</div>
    } else if (!products.length) {
        return <div>Could not find products for "{searchQuery}"</div>
    }

    return (
        <div className='search-page-container'>
            {products.map(product => (
                <Product
                    name={product.name}
                    image={product.default_image_urls.main_image_url}
                    key={product.product_code}
                />
            ))}
        </div>
    )
}