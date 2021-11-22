import './App.css';
import { Pokemon } from './components/students';

function App() {
  return (
    <div className="border-4 bg-red-600">
      <header className="flex justify-center">
        <div alt="logo">
          <Pokemon/>
          </div>
      </header>
    </div>
  );
}

export default App;
