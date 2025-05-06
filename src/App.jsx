// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

import logo     from './assets/ContinuumCOLOR.png';
import moldura  from './assets/MOLDURA_HOME_VERDE.png';

// ícones sociais
import twitterIcon from './assets/Twiiter.png';
import faceIcon    from './assets/Face.png';
import ytIcon      from './assets/YT.png';
import instaIcon   from './assets/Insta.png';
import tiktokIcon  from './assets/TikTok.png';

function App() {
  const [isModalOpen, setIsModalOpen]         = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [email, setEmail]                     = useState('');
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState(null);

  // injeta o <link> do Google Fonts no <head> sem tocar no index.html
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nova+Square:ital,wght@0,400;0,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        'https://y57yu3j3k2.execute-api.sa-east-1.amazonaws.com/prod/api/email-out',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Erro ao enviar e-mail');
      }
      setIsModalOpen(false);
      setSuccessModalOpen(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* LOGO */}
      <header className="app-header">
        <img src={logo} alt="Continuum Logo" className="logo" />
      </header>

      {/* VÍDEO + MOLDURA */}
      <div className="frame-container">
        <iframe
          src="https://www.youtube.com/embed/WDIAiMfiCyY"
          title="Continuum Video"
          className="video-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <img src={moldura} alt="Moldura" className="frame-image" />
      </div>

      {/* SEÇÃO INFERIOR */}
      <section className="lower-section">
        <span className="aguarde-text">AGUARDE...</span>

        <div
          className="botao-container"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyPress={() => setIsModalOpen(true)}
        >
          <span className="botao-text">
            Cadastre o seu email para receber novidades
          </span>
        </div>

        <div className="social-container">
          {[twitterIcon, instaIcon, ytIcon, faceIcon, tiktokIcon].map((icon, i) => (
            <img key={i} src={icon} className="social-icon" />
          ))}
        </div>
      </section>

      {/* MODAL DE INSCRIÇÃO */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Cadastre seu e-mail</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="seu@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="modal-submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
            {error && <p className="modal-error">{error}</p>}
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      {successModalOpen && (
        <div className="modal-overlay" onClick={() => setSuccessModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSuccessModalOpen(false)}>×</button>
            <h2>E-mail cadastrado!</h2>
            <p>Obrigado por se inscrever.</p>
            <button className="modal-submit" onClick={() => setSuccessModalOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
