import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SearchInput from 'components/search-input';
import HomePage from 'containers/home-page';
import SearchPage from 'containers/search-page';

function App() {
  return (
    <Router>
      <div>
        <SearchInput />
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/search' component={SearchPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
