//import { Button } from '@chakra-ui/react';
import "./App.css";
import { Route } from 'react-router-dom';

import Homepage from './pages/homepage';
import chatPage from './pages/chatPage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact/>
      <Route path="/chats" component={chatPage}/>

    </div>
  );
}

export default App;
