import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import Navbar from './component/Navbar/navbar';
import Home from './component/Home/home';
import About from './component/About/about';
import Events from './component/Events/events';
import Gallery from './component/gallery/gallery';
import Team from './component/Team/team';
import Sponsors from './component/sponsors/sponsors';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </Router>
  );
}

export default App;
