import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const rootEl = document && document.getElementById('app');

const renderApp = () => {
  hydrate(
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
  module.hot.accept('./Root', () => {
    renderApp();
  });
}
