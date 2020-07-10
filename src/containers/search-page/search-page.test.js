import React from 'react';
import { render, wait, within } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import SearchPage, { useFetchSearchApi } from './';
import { act } from 'react-dom/test-utils';

test('renders the component', () => {
    let container;
    act(() => {
        container = render(<SearchPage location={{
            pathname: '/search',
            search: '?key=shoe'
        }} />)
    })
    expect(container).toMatchSnapshot();
})

const mockData = {
    products: [
        {
            name: 'Cycling Shoe',
            default_image_urls: { main_image_url: 'http://sample.com/cyclingshoe' },
            product_code: '123'
        },
        {
            name: 'Hiking Shoe',
            default_image_urls: { main_image_url: 'http://sample.com/hikingshoe' },
            product_code: '234'
        }
    ]
}

const mockLocation = {
    pathname: '/search',
    search: '?key=shoe'
}

describe('useFetchSearchApi', () => {
    test('products saved to state if success', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockData)
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useFetchSearchApi(mockLocation, 'shoe'));
        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.products).toBe(mockData.products);
    });

    test('error when status code no 200-299', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                status: 300,
                json: () => Promise.resolve(mockData)
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useFetchSearchApi(mockLocation, 'shoe'));
        await waitForNextUpdate();
        expect(result.current.products).toEqual([]);
        expect(result.current.error).toEqual('Error retrieving products, please try again.');
    });
});