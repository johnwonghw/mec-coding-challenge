import React, { useEffect, useState } from 'react';
import Product from 'components/product';
import './search-page.scss';

export default function SearchPage({ location }) {
    const searchQuery = new URLSearchParams(location.search).get("key");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const url = `http://www.mec.ca/api/v1/products/search?keywords=${searchQuery}`;

            fetch(proxyUrl + url)
                .then(res => res.json())
                .then(data => setProducts(data.products ? data.products : []))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false))
        } else {
            setProducts([])
        }
    }, []);

    return (
        <div className='search-page-container'>
            {isLoading
                ? <div>Loading "{searchQuery}"</div>
                : products.map(product => (
                    <Product
                        name={product.name}
                        image={product.default_image_urls.main_image_url}
                        key={product.product_code}
                    />
                ))}
        </div>
    )
}