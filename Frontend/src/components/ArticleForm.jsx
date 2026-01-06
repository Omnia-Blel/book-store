// frontend/src/components/ArticleForm.jsx
import React, { useState } from 'react';
import { articlesAPI } from '../services/api';

const ArticleForm = ({ onArticleAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Le nom de l\'auteur est requis';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Le contenu est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      await articlesAPI.create(formData);
      setSuccessMessage('Article créé avec succès !');
      setFormData({ title: '', author: '', content: '' });
      
      // Notifier le parent pour rafraîchir la liste
      if (onArticleAdded) {
        onArticleAdded();
      }

      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erreur lors de la création de l\'article';
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="article-form-container">
      <h2 className="section-title">Nouveau article</h2>

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-error">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">
            Titre <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-control ${errors.title ? 'error' : ''}`}
            placeholder="Titre de votre article"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">
            Nom de l'auteur <span className="required">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className={`form-control ${errors.author ? 'error' : ''}`}
            placeholder="Nom de l'auteur"
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Contenu <span className="required">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            className={`form-control ${errors.content ? 'error' : ''}`}
            rows="5"
            placeholder="Contenu de votre article"
            value={formData.content}
            onChange={handleChange}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;