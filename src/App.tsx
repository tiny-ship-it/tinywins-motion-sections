import { Routes, Route, Link } from 'react-router-dom';
import HorizontalSpectrum from './components/HorizontalSpectrum';
import DesigningFeelings from './components/DesigningFeelings';
import MakeThemFeel from './components/MakeThemFeel';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HorizontalSpectrum />} />
        <Route path="/designing-feelings" element={<DesigningFeelings />} />
        <Route path="/make-them-feel" element={<MakeThemFeel />} />
      </Routes>

      {/* Navigation for development */}
      <nav
        className="fixed bottom-4 left-4 z-50 flex gap-4 bg-black/80 px-4 py-2 rounded-lg"
        style={{ fontFamily: "'Suisse Intl', sans-serif", fontSize: 12 }}
      >
        <Link to="/" className="text-white hover:text-white/70 transition-colors">
          Horizontal Spectrum
        </Link>
        <Link to="/designing-feelings" className="text-white hover:text-white/70 transition-colors">
          Designing Feelings
        </Link>
        <Link to="/make-them-feel" className="text-white hover:text-white/70 transition-colors">
          Make Them Feel
        </Link>
      </nav>
    </div>
  );
}

export default App;
