import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading, error, validationErrors } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  };

  const validationRules = {
    firstName: { required: true, label: 'Prénom' },
    lastName: { required: true, label: 'Nom' },
    email: { required: true, email: true, label: 'Email' },
    password: { required: true, minLength: 8, label: 'Mot de passe' },
    confirmPassword: { required: true, match: 'password', label: 'Confirmation du mot de passe' }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validationRules);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const onSubmit = async (formData) => {
    try {
      await register(formData);
    } catch (err) {
      console.error("Erreur d'inscription:", err);
    }
  };

  // Icônes SVG
  const EyeIcon = ({ width = 20 }) => (
    <svg width={width} height={width} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeSlashIcon = ({ width = 20 }) => (
    <svg width={width} height={width} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );

  return (
    <div 
      className="container-fluid vh-100 d-flex " 
      style={{
        background: '#1E3881'
      }}
    >
      {/* Section gauche */}
      <div className="col-lg-7 d-flex align-items-center justify-content-center text-white p-3">
        <div style={{ maxWidth: '500px' }}>
          <div className="d-flex flex-column align-items-start">
            <img
              src="/assets/images/STAGE LINK BLANC.png"
              alt="Stage Link Logo"
              width={339}
              height={240}
              marginLeft= {50}
              className="mb-3"
            />
            <h1 className="fw-bold mb-3"
              style={{
                fontSize: '3.5rem',
                fontFamily: 'Belanosima, sans-serif',
                fontWeight: 600,
                lineHeight: '100%',
                color: '#FFFFFF'  
              }}
            >
              BIENVENUE!
            </h1>
            
            <hr className="text-white opacity-50 mb-4" style={{ width: '134px', height: '3px', marginLeft: 0 }} />
            
            <p className="mb-5" style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              fontFamily: 'Be Vietnam Pro, sans-serif',
              fontWeight: 400,
              color: '#FFFFFF',
              text:'align-items-left',
              textAlign: 'left'
            }}>
              Inscrivez-vous pour suivre vos stages, échanger
              avec vos encadreurs et déposer vos rapports en toute
              simplicité. Donnez un coup d'accélérateur à votre
              parcours professionnel dès aujourd'hui!
            </p>
          </div>
        </div>
      </div>

      {/* Section droite */}
      <div className="col-lg-5 d-flex align-items-center justify-content-center p-3">
        <div 
          className="w-150 rounded-4 shadow-lg p-4"
          style={{
            maxWidth: '450px',
            background: 'rgba(241, 238, 238, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(241, 234, 234, 0.2)',
            maxHeight: '90vh',
          }}
        >
          <div className="text-center mb-3">
            <div 
              className="bg-primary bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-2" 
              style={{ width: "40px", height: "40px" }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="fw-bold text-white mb-1" style={{ fontSize: '1.6rem' }}>
              Inscription
            </h2>
            <p className="text-white mb-3" style={{ fontSize: '0.9rem' }}>
              Créez votre compte
            </p>
          </div>

          {error && (
            <div className="alert alert-danger rounded-3 mb-2" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>{error}</div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }}>
            {/* Prénom et Nom */}
            <div className="row mb-2">
              <div className="col-md-6">
                <input 
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={values.firstName}
                  onChange={handleChange}
                  className={`form-control py-2 rounded-3 ${errors.firstName || validationErrors.first_name ? "is-invalid" : ""}`}
                  style={{ 
                    backgroundColor: 'rgba(241, 243, 245, 0.5)',
                    border: 'none',
                    fontSize: '14px'
                  }}
                  disabled={isLoading}
                />
                {(errors.firstName || validationErrors.first_name) && (
                  <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>{errors.firstName || validationErrors.first_name?.[0]}</div>
                )}
              </div>
              <div className="col-md-6">
                <input 
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={values.lastName}
                  onChange={handleChange}
                  className={`form-control py-2 rounded-3 ${errors.lastName || validationErrors.last_name ? "is-invalid" : ""}`}
                  style={{ 
                    backgroundColor: 'rgba(241, 243, 245, 0.5)',
                    border: 'none',
                    fontSize: '14px'
                  }}
                  disabled={isLoading}
                />
                {(errors.lastName || validationErrors.last_name) && (
                  <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>{errors.lastName || validationErrors.last_name?.[0]}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-2">
              <input 
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={values.email}
                onChange={handleChange}
                className={`form-control py-2 rounded-3 ${errors.email || validationErrors.email ? "is-invalid" : ""}`}
                style={{ 
                  backgroundColor: 'rgba(241, 243, 245, 0.5)',
                  border: 'none',
                  fontSize: '14px'
                }}
                disabled={isLoading}
              />
              {(errors.email || validationErrors.email) && (
                <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>{errors.email || validationErrors.email?.[0]}</div>
              )}
            </div>

            {/* Rôle */}
            <div className="mb-2">
              <select
                name="role"
                value={values.role}
                onChange={handleChange}
                className="form-select py-2 rounded-3"
                style={{ 
                  backgroundColor: 'rgba(241, 243, 245, 0.5)',
                  border: 'none',
                  fontSize: '14px'
                }}
                disabled={isLoading}
              >
                <option value="student">Étudiant</option>
                <option value="company">Entreprise</option>
              </select>
            </div>

            {/* Mot de passe */}
            <div className="mb-2 position-relative">
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={values.password}
                onChange={handleChange}
                className={`form-control py-2 rounded-3 ${errors.password || validationErrors.password ? "is-invalid" : ""}`}
                style={{ 
                  backgroundColor: 'rgba(237, 240, 243, 0.5)',
                  border: 'none',
                  fontSize: '14px',
                  paddingRight: '45px'
                }}
                disabled={isLoading}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn position-absolute text-muted"
                style={{ 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  padding: '0'
                }}
                disabled={isLoading}
              >
                {showPassword ? <EyeSlashIcon width={18}/> : <EyeIcon width={18}/>}
              </button>
              {(errors.password || validationErrors.password) && (
                <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>{errors.password || validationErrors.password?.[0]}</div>
              )}
            </div>

            {/* Confirmer mot de passe */}
            <div className="mb-3 position-relative">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={values.confirmPassword}
                onChange={handleChange}
                className={`form-control py-2 rounded-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
                style={{ 
                  backgroundColor: 'rgba(237, 240, 243, 0.5)',
                  border: 'none',
                  fontSize: '14px',
                  paddingRight: '45px'
                }}
                disabled={isLoading}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="btn position-absolute text-muted"
                style={{ 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  padding: '0'
                }}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeSlashIcon width={18}/> : <EyeIcon width={18}/>}
              </button>
              {errors.confirmPassword && (
                <div className="invalid-feedback" style={{ fontSize: '0.75rem' }}>{errors.confirmPassword}</div>
              )}
            </div>

            <button 
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold rounded-3 mb-3"
              style={{ 
                fontSize: '15px',
                background: 'white',
                border: 'none',
                color: '#1E3881',
                font: 'Be Vietnam'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-white mb-0" style={{ fontSize: '0.9rem' }}>
              Déjà un compte ?{" "}
              <button 
                type="button"
                onClick={navigateToLogin}
                className="btn btn-link p-0 text-#1E3881 fw-semibold text-decoration-underline"
                disabled={isLoading}
                style={{ color: 'white !important', fontSize: '0.9rem' }}
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;