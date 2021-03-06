import '@hackoregon/component-library/assets/global.styles.css';
/* eslint-disable */
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/leaflet.css';
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/react-select.min.css';
/* eslint-enable */
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import AppPage from './views/HomePage';
import createRoutes from './routes';

const locationStateSelector = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.routing;

    if (routingState !== prevRoutingState) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: locationStateSelector(),
});

const routes = createRoutes(store);

const rootRoute = {
  component: AppPage,
  childRoutes: routes,
};

const renderApp = () => {
  render(
    <Provider store={store}>
      <Router history={history} routes={rootRoute} />
    </Provider>,
    document.getElementById('content'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp();
  });
}
