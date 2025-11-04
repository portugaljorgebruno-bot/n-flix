import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sempre mostrar mensagem de erro
    setShowError(true);
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
      height: '100vh',
      background: 'linear-gradient(to bottom, #B20710, #000)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '40px 35px',
        borderRadius: '6px',
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Logo centralizado */}
        <div style={{
          marginBottom: '35px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img 
            src="https://mocha-cdn.com/019a4b3f-7c62-7754-adc6-91368a479acd/Netflix_Logo_2fg2PMS.png" 
            alt="Logo" 
            style={{
              height: '48px',
              maxWidth: '120px'
            }}
          />
        </div>

        <h1 style={{
          fontSize: '26px',
          fontWeight: 700,
          marginBottom: '25px',
          textAlign: 'left',
          width: '100%'
        }}>Entrar</h1>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="email"
            name="email"
            placeholder="Email ou número de celular"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '14px 12px',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#0f0f0f',
              color: '#fff',
              fontSize: '16px',
              marginBottom: '18px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '14px 12px',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#0f0f0f',
              color: '#fff',
              fontSize: '16px',
              marginBottom: '18px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            required
          />

          {showError && (
            <div style={{
              color: '#E50914',
              fontSize: '14px',
              marginBottom: '18px',
              textAlign: 'center'
            }}>
              Usuário não encontrado. Crie uma nova conta.
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#E50914',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '10px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#B0060F';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#E50914';
            }}
          >
            Entrar
          </button>
        </form>

        <div style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <Link 
            to="/register"
            style={{
              display: 'block',
              color: '#B3B3B3',
              fontSize: '14px',
              textDecoration: 'none',
              marginTop: '8px',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            Criar nova conta
          </Link>
        </div>

        <p style={{
          marginTop: '25px',
          fontSize: '12px',
          color: '#8C8C8C',
          lineHeight: 1.4,
          textAlign: 'center'
        }}>
          Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. 
          <a href="#" style={{
            color: '#3B82F6',
            textDecoration: 'none'
          }}> Saiba mais</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
