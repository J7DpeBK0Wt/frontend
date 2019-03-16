import '@babel/polyfill';
import FontFaceObserver from 'fontfaceobserver';
import 'normalize.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './scenes/App';
import * as serviceWorker from './serviceWorker';
import { configureStore, runSaga } from './store';
import rootSaga from './modules/sagas';
import './styles.scss';

type AppComponentType = typeof App;

// Font observer
const openSansObserver = new FontFaceObserver('Open Sans');
openSansObserver.load().then(() => {
    document.documentElement.className += ' open-sans-loaded';
});

// Create Redux store
const store = configureStore();

// Run root saga
runSaga(rootSaga);

// Main render function
const render = (Component: AppComponentType) => {
    const rootNode = document.getElementById('root');

    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        rootNode
    );
};

// Initial render
render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./scenes/App', () => {
        const NextApp = (require('./scenes/App').default as AppComponentType);
        render(NextApp);
    });
}
