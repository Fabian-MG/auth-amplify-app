import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom'
import { NoteList, Navbar } from './components';
import PrivateDashboard from './components/PrivateDashboard/PrivateDashboard';
import PublicDashboard from './components/PublicDashboard/PublicDashboard';
import { useCallback, useEffect, useState } from 'react';

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
            <PublicDashboard />
        </Route>
        <Route path="/dashboard">
            <PrivateDashboard />
        </Route>
        <Route path="/">
          Hi
        </Route> 
      </Switch>
    </div>
  );
}

export default App;