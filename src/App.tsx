import './App.css';
import Body from './components/Body';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Body />
    </FavoritesProvider>
  );
}

export default App;
