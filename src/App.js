// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <BrowserRouter>
          <Main/>
          </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
