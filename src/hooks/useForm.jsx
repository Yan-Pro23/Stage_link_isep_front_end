import { useState } from "react";

// ✅ Export nommé : tu pourras importer avec { useForm }
export function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Validation simple
  const validate = (name, value) => {
    let error = "";

    const rules = validationRules[name];
    if (!rules) return error;

    if (rules.required && !value) {
      error = `${rules.label || name} est requis.`;
    }

    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Adresse email invalide.";
      }
    }

    if (rules.minLength && value.length < rules.minLength) {
      error = `${rules.label || name} doit avoir au moins ${rules.minLength} caractères.`;
    }

    if (rules.match && value !== values[rules.match]) {
      error = `${rules.label || name} ne correspond pas.`;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Valider le champ modifié
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (callback) => {
    return (event) => {
      event.preventDefault();

      let newErrors = {};
      Object.keys(validationRules).forEach((key) => {
        const error = validate(key, values[key]);
        if (error) newErrors[key] = error;
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        callback(values);
      }
    };
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  };
}
