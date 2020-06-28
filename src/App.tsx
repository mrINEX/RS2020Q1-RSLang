import React, { useContext } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import {
  Authorization, Main, Settings, Statistics
} from './pages';

import { Header } from './commonComponents';
import { StateContext } from './store/stateProvider';

import SpeakIt from './pages/games/speakit/speakit';

function App() {
  const { state } = useContext(StateContext);
  const { isAuth } = state.auth;
  return (
    <>
      <BrowserRouter>
        {isAuth && <Header />}
        <Switch>
          <Route exact path="/authorization" component={Authorization} />
          {isAuth && (
          <>
            <Route exact path="/main" component={Main} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/games" component={SpeakIt} />
          </>
          )}
          <Redirect to={isAuth ? '/main' : '/authorization'} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
