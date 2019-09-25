import * as React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const rootEl = document && document.getElementById('app');

const r = module.hot ? render : hydrate;

const renderApp = () => {
  return r(
    <AppContainer>
      <>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </>
    </AppContainer>,
    rootEl
  );
};

renderApp();

if (module.hot) {
  module.hot.accept();
}
