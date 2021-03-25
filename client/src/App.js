import Axios from 'axios';
import UserContextProvider from './context/UserContext';
import Router from './components/Router';

Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div>
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
