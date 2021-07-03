import { useCallback, useEffect, useState } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom'
import { NoteList, Navbar, Profile, PrivateDashboard } from './components';

import './App.css';

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
        <Route path="/dashboard">
            <PrivateDashboard />
        </Route>
        <Route path="/">
          Home
        </Route> 
      </Switch>
    </div>
  );
}

export default App;