// frontend/src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import ArticleForm from './components/ArticleForm';
import ArticleList from './components/ArticleList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleArticleAdded = () => {
    // Déclenche un rafraîchissement de la liste
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <Navbar />
      
      <main className="container">
        <h1 className="page-title">Articles</h1>
        
        <div className="divider"></div>
        
        <ArticleForm onArticleAdded={handleArticleAdded} />
        
        <div className="divider"></div>
        
        <ArticleList refreshTrigger={refreshTrigger} />
      </main>

      <footer className="footer">
        <div className="footer-content">
          © Copyright: <a href="#">MonApp</a>
        </div>
      </footer>
    </div>
  );
}

export default App;