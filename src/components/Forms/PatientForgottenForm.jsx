// CONFIG IMPORTS
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// SERVICES IMPORTS
import { patientPasswordForgottenFetch } from 'services/apiManager';

// COMPONENTS IMPORTS
import ErrorsModalPawd from 'components/ErrorsModalPawd';


const PatientForgottenForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const forgot = useSelector((state) => state.patient)
  const history = useHistory()

  const handlePatientForgottenForm = async (e) => {
    e.preventDefault();
    if (email) {
      const patientResetEmail = {
        email: email,
      }
      await dispatch(patientPasswordForgottenFetch(patientResetEmail))
    } else {
      alert("Veuillez renseigner un email")
    }
  };

  useEffect(() => {
    document.querySelector(".error-modal").style.opacity = 0;
    document.querySelector(".error-modal").style.visibility = "hidden";
    isValidated()
  }, [forgot]);

  const isValidated = () => {
    if (forgot.forgotPassword.status) {
        alert("Un email vous a été envoyé")
      setTimeout(() => {
        history.push("/");
      }, 1000)
    };
    if (forgot.error) {
      document.querySelector(".error-modal").style.opacity = 1;
      document.querySelector(".error-modal").style.visibility = "visible";
    }
  };

  return (
    <div className="patient-forgotten-form d-flex justify-content-center">
      <ErrorsModalPawd errors={forgot.error}/>
      <div className="form-container">
        <p className="text-third-color">
          Cher patient, renseignez votre email pour recevoir un lien et
          réinitialiser votre mot de passe.
        </p>
        <form onSubmit={(e) => handlePatientForgottenForm(e)}>
          <label htmlFor="email" className="text-white-color pt-2">
            Email*
          </label>
          <input
            type="email"
            className="input-display"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            className="btn success-button mt-5 w-100"
            value="Envoyer"
          />
        </form>
      </div>
    </div>
  );
};

export default PatientForgottenForm;