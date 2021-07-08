import { useCallback, useEffect, useState } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom'
import { NoteList, Navbar, Profile, Dashboard } from './components';

import './App.css';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  const location = useLocation()
  const [current, setCurrent] = useState('/home')

  const setRoute = useCallback(() => {
    const pathname = location.pathname
    setCurrent(pathname ? pathname : 'home')
  }, [location])

  useEffect(() => {
    setRoute()
  },[setRoute])

  return (
    <div className="w-screen flex flex-col items-center justify-center align">
      <Navbar current={current}/>
      <Switch>
        <Route path="/notes">
            <NoteList />
        </Route>
        <Route path="/profile">
            <Profile />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="/">d
          Home
        </Route> 
      </Switch>
    </div>
  );
}

export default App;