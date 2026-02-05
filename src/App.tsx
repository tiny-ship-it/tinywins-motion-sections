import { Routes, Route, Link } from 'react-router-dom';
import { Agentation } from 'agentation';
import HorizontalSpectrum from './components/HorizontalSpectrum';
import DesigningFeelings from './components/DesigningFeelings';
import MakeThemFeel from './components/MakeThemFeel';
import './App.css';

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: 500,
  fontFamily: "'Suisse Intl', sans-serif",
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center',
  width: '280px',
};

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      <h1 style={{
        fontFamily: "'Suisse Intl', sans-serif",
        fontSize: '32px',
        fontWeight: 500,
        color: '#000',
        marginBottom: '32px',
      }}>
        TinyWins Motion Explorations
      </h1>
      <Link to="/horizontal-spectrum" style={buttonStyle}>
        Horizontal Spectrum
      </Link>
      <Link to="/designing-feelings" style={buttonStyle}>
        Designing Feelings
      </Link>
      <Link to="/make-them-feel" style={buttonStyle}>
        Make Them Feel
      </Link>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horizontal-spectrum" element={<HorizontalSpectrum />} />
          <Route path="/designing-feelings" element={<DesigningFeelings />} />
          <Route path="/make-them-feel" element={<MakeThemFeel />} />
        </Routes>
      </div>
      <Agentation />
    </>
  );
}

export default App;
