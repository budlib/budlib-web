import React from 'react';
import logo from './logo.jpg';
import Sidebar from './components/sidebar';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    // <div className='App'>
    //     <header className='App-header'>
    //         <img src={logo} className='App-logo' alt='logo' />
    //         <br />
    //         <br />
    //         <p>Coming up soon</p>
    //     </header>
    // </div>

    <Sidebar />

    // <Router>
    //     <Switch>
    //         <Route path='/components/:type/:subtype/:name'>
    //             <ComponentRenderer />
    //         </Route>
    //         <Route path='/components/:type/:name'>
    //             <ComponentRenderer />
    //         </Route>
    //         <Route path='/thank-you'>
    //             <ThankYouPage />
    //         </Route>
    //         <Route path='/'>
    //             <MainLandingPage />
    //         </Route>
    //     </Switch>
    // </Router>
  );
}

export default App;
