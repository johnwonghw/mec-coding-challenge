import React from 'react';
import './product.scss';

export default function Product({name, image}) {
    return (
        <div className='product-container'>
            <img className='product-image' src={image} alt={`${name}`} />
            <div className='product-name'>{name}</div>
        </div>
    )
}