import { LoadingProvider } from '@/context/LoadingContext';
import MainContent from './components/MainContent';
import './styles/global.css';

function App() {
  return (
    <LoadingProvider>
      <MainContent />
    </LoadingProvider>
  );
}

export default App;