import Axios from 'axios';
import UserContextProvider from './context/UserContext';
import Router from './components/Router';

Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className='max-w-2xl mx-auto pt-10 px-6'>
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
