// src/App.jsx
import React, { useState } from 'react';
import './App.css';

import logo     from './assets/ContinuumCOLOR.png';
import moldura  from './assets/MOLDURA_HOME_VERDE.png';
import botaoImg from './assets/BOTAO_VERDE.png';

// ícones sociais
import twitterIcon from './assets/Twiiter.png';
import faceIcon    from './assets/Face.png';
import discordIcon from './assets/Discord.png';
import ytIcon      from './assets/YT.png';
import instaIcon   from './assets/Insta.png';
import tiktokIcon  from './assets/TikTok.png';  // Novo ícone do TikTok

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email,       setEmail]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email cadastrado:', email);
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      {/* ---------- LOGO ---------- */}
      <header className="app-header">
        <img src={logo} alt="Continuum Logo" className="logo" />
      </header>

      {/* ---------- VÍDEO COM MOLDURA ---------- */}
      <div className="frame-container">
        <iframe
          src="https://www.youtube.com/embed/WDIAiMfiCyY"
          title="Continuum Video"
          className="video-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <img src={moldura} alt="Moldura Home Verde" className="frame-image" />
      </div>

      {/* ---------- TUDO QUE VEM DEPOIS DO VÍDEO ---------- */}
      <section className="lower-section">
        <span className="aguarde-text">AGUARDE...</span>

        <div
          className="botao-container"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyPress={() => setIsModalOpen(true)}
        >
          {/* background do botão é via CSS; a <img> não é mais necessária */}
          <span className="botao-text">
            Cadastre o seu email para receber novidades
          </span>
        </div>

        <div className="social-container">
          <a href="https://x.com/continuumentert" target="_blank" rel="noreferrer">
            <img src={twitterIcon} alt="X (Twitter)" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/continuumentert" target="_blank" rel="noreferrer">
            <img src={instaIcon} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.youtube.com/@continuumentertainment" target="_blank" rel="noreferrer">
            <img src={ytIcon} alt="YouTube" className="social-icon" />
          </a>
          <a href="https://web.facebook.com/p/Continuum-Entertainment-100054417253310/?locale=pt_BR" target="_blank" rel="noreferrer">
            <img src={faceIcon} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.tiktok.com/@continuumentertainment" target="_blank" rel="noreferrer">
            <img src={tiktokIcon} alt="TikTok" className="social-icon" />  {/* Ícone do TikTok */}
          </a>
        </div>

        <div className="footer-text">
          © 2025 Continuum Entertainment. Todos os direitos reservados.
        </div>
      </section>

      {/* ---------- MODAL ---------- */}
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
              <button type="submit" className="modal-submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
