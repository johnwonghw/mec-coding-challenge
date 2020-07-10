import React from 'react';
import SearchInput from './';
import { render, fireEvent } from '@testing-library/react'

test('renders the component', () => {
    const container = render(<SearchInput.WrappedComponent />)
    expect(container).toMatchSnapshot()
});

test('go to /search page when Enter key pressed', () => {
    const historyMock = { push: jest.fn() }
    const { getByTestId } = render(<SearchInput.WrappedComponent history={historyMock} />)
    const inputNode = getByTestId('search-input');

    // search with empty string
    let pushParams = { pathname: '/search', search: 'key=' };
    fireEvent.keyPress(inputNode, { key: 'Enter', code: 13, charCode: 13 });
    expect(historyMock.push).toBeCalledWith(pushParams);

    // search with search key 'shoe'
    const searchTerm = 'shoe';
    pushParams = { pathname: '/search', search: `key=${searchTerm}` };
    fireEvent.change(inputNode, { target: { value: searchTerm } });
    fireEvent.keyPress(inputNode, { key: 'Enter', code: 13, charCode: 13 });
    expect(historyMock.push).toBeCalledWith(pushParams);
    expect(historyMock.push).toBeCalledTimes(2);
});