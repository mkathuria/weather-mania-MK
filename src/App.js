import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { App } from './routes';

export const history = createBrowserHistory()
function Main() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

export default Main;
