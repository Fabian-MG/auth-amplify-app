import './App.css';
import { NoteList, Navbar } from './components';

function App() {
  return (
    <div className="w-screen flex flex-col items-center justify-center align">
      <Navbar />
      <NoteList />
    </div>
  );
}

export default App;