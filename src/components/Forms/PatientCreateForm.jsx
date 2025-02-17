// CONFIG IMPORTS
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// SERVICES IMPORTS
import { patientCreateFetch } from 'services/apiManager';

// COMPONENTS IMPORTS
import ErrorsModal from 'components/ErrorsModal';


const PatientCreateForm = () => {
  const dispatch = useDispatch()
  const isRegistered = useSelector(state => state.patient)
  const history = useHistory()
  
  const createPatient = async (e) => {
    e.preventDefault()
    let first_name = document.querySelector('#first-name').value
    let last_name = document.querySelector('#last-name').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    let password_confirmation = document.querySelector('#password-confirmation').value

    const data = {
      patient: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        nutritionist_id: parseInt(Cookies.get("nutritionist_id_cookie")),
      },
    };
    dispatch(patientCreateFetch(data))
  };
  
  useEffect(() => {
    isRegistered.newPatient &&
      history.push("/nutritionist-dashboard");
    if (isRegistered.error) {
      document.querySelector(".error-modal").style.opacity = 1;
      document.querySelector(".error-modal").style.visibility = "visible";
    }
  }, [isRegistered])

  return (
    <div className="create-appointment-form">
      {isRegistered.error && <ErrorsModal errors={isRegistered.error.errors} />}
      <h1 className="text-primary-color">Nouveau patient</h1>
      <form
        className="appointment-form text-primary-color"
        onSubmit={createPatient}
      >
        <div className="d-flex row justify-content-left py-2">
          <div className="col-lg-4 col-sm-8">
            <label>Prénom</label>
            <input
              className="input-display"
              type="text"
              id="first-name"
              placeholder="Prénom"
              required
            />
          </div>
          <div className="col-lg-4 col-sm-8">
            <label>Nom</label>
            <input
              className="input-display"
              type="text"
              id="last-name"
              placeholder="Nom"
              required
            />
          </div>
        </div>
        <div>
          <div className="col-lg-6 col-sm-8">
            <label>Email</label>
            <input
              className="input-display"
              type="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <hr className="m-4" />
          <div className="d-flex row justify-content-left py-2">
            <div className="col-lg-4 col-sm-12">
              <label>Mot de passe</label>
              <input
                className="input-display"
                type="password"
                id="password"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div className="col-lg-4 col-sm-12">
              <label>Confirmation de mot de passe</label>
              <input
                className="input-display"
                type="password"
                id="password-confirmation"
                placeholder="Confirmation"
                required
              />
            </div>
            <p className='text-muted'>N'oubliez pas de transmettre le mot de passe à votre patient</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-8">
            <input
              type="submit"
              value="Créer"
              className="btn success-button my-3 col-lg-3 col-sm-12"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientCreateForm;