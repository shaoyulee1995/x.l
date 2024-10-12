import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Menu from './component/Menu';
import Header from './component/Header';
import Footer from './component/Footer';
import LeetCodePage from './pages/LeetCodePage';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/LeetCodePage" element={<LeetCodePage />} />
                {/* Add other routes as needed */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;