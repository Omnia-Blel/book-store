// frontend/src/components/ArticleList.jsx
import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api';

const ArticleList = ({ refreshTrigger }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articlesAPI.getAll();
      setArticles(data);
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [refreshTrigger]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await articlesAPI.delete(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression de l\'article');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Chargement des articles...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="article-list-container">
      <h2 className="section-title">Liste d'articles</h2>

      {articles.length === 0 ? (
        <div className="no-articles">
          <p>Aucun article pour le moment. Créez-en un !</p>
        </div>
      ) : (
        articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-header">
              <h3 className="article-title">{article.title}</h3>
              <span className="article-date">{formatDate(article.date)}</span>
            </div>
            <div className="article-body">
              <p className="article-content">{article.content}</p>
              <footer className="article-footer">
                <cite>{article.author}</cite>
              </footer>
            </div>
            <div className="article-actions">
              <button 
                onClick={() => handleDelete(article.id)}
                className="btn btn-danger btn-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ArticleList;