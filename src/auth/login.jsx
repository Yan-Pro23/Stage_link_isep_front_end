import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, validationErrors, clearErrors } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationRules = {
    email: { required: true, email: true, label: 'Email' },
    password: { required: true, minLength: 8, label: 'Mot de passe' }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validationRules);

  const navigateToRegister = () => {
    navigate('/register');
  };

  const onSubmit = async (formData) => {
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error("Erreur d'authentification:", err);
    }
  };

  const EyeIcon = ({ width = 18 }) => (
    <svg width={width} height={width} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeSlashIcon = ({ width = 18 }) => (
    <svg width={width} height={width} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: '#1E3881'
      }}
    >
      <div
        className="rounded-4 shadow-lg p-4"
        style={{
          maxWidth: '420px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxHeight: '95vh',
          overflowY: 'auto'
        }}
      >
        {/* En-tête avec logo image */}
        <div className="text-center mb-4">
          <div
            className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
            style={{ width: "70px", height: "70px" }}
          >
            <div className="mb-3">
              <img
                src="/assets/images/STAGE LINK ICON.png"
                alt="Stage Link Logo"
                style={{
                  maxWidth: '82px',
                  height: 'auto',
                  paddingTop: '20px'
                }}
              />
            </div>
          </div>
          <h2 className="fw-bold text-white mb-1"
            style={{
              fontSize: '1.4rem',
              fontWeight: 600,
              fontFamily: 'Be Vietnam, sans-serif'
            }}>
            Plateforme de Gestion
          </h2>
          <p className="fw-bold text-white mb-0" style={{
            fontSize: '1.4rem',
            fontWeight: 600,
            fontFamily: 'Be Vietnam, sans-serif'
          }}>
            des Stages
          </p>
        </div>

        {error && (
          <div className="alert alert-danger rounded-3 mb-3" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }}>
          {/* Champ email */}
          <div className="mb-3">
            <label className="text-white mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Adresse mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="exemple@gmail.com"
              value={values.email}
              onChange={handleChange}
              className={`form-control py-2 rounded-3 ${errors.email || validationErrors.email ? "is-invalid" : ""}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '14px',
                color: 'white'
              }}
              disabled={isLoading}
            />
            {(errors.email || validationErrors.email) && (
              <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>
                {errors.email || validationErrors.email?.[0]}
              </div>
            )}
          </div>

          {/* Champ mot de passe */}
          <div className="mb-3">
            <label className="text-white mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Mot de passe
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de Passe"
                value={values.password}
                onChange={handleChange}
                className={`form-control py-2 rounded-3 ${errors.password || validationErrors.password ? "is-invalid" : ""}`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '14px',
                  paddingRight: '45px',
                  color: 'white'
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn position-absolute text-white"
                style={{
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  padding: '0',
                  opacity: 0.7
                }}
                disabled={isLoading}
              >
                {showPassword ? <EyeSlashIcon width={18} /> : <EyeIcon width={18} />}
              </button>
              {(errors.password || validationErrors.password) && (
                <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>
                  {errors.password || validationErrors.password?.[0]}
                </div>
              )}
            </div>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="btn w-100 py-2 fw-bold rounded-3 mb-3"
            style={{
              fontSize: '15px',
              background: 'white',
              border: 'none',
              color: '#1E3881',
              transition: 'all 0.3s ease'
            }}
            disabled={isLoading}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Lien vers inscription */}
        <div className="text-center">
          <p className="text-white mb-0" style={{ fontSize: '0.9rem' }}>
            Pas encore de compte ?{" "}
            <button
              type="button"
              onClick={navigateToRegister}
              className="btn btn-link p-0 text-white fw-semibold text-decoration-underline"
              disabled={isLoading}
              style={{
                color: 'white !important',
                fontSize: '0.9rem',
                opacity: 1
              }}
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;