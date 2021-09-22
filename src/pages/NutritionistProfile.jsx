import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { nutritionistsFetch } from 'services/apiManager';
import Cookies from "js-cookie";
import SidebarNutritionist from 'components/SidebarNutritionist';
import { Link } from 'react-router-dom';
import { nutritionistLogout } from 'services/apiManager';
import { deleteNutritionistFetch } from 'services/apiManager';

const NutritionistProfile = () => {
  const [nutritionist, setNutritionist] = useState();
  const nutritionist_id = parseInt(Cookies.get('nutritionist_id_cookie'));
  const nutritionists = useSelector(state => state.nutritionists)
  const dispatch = useDispatch() 

  const getNutritionist = () => {
    if (nutritionists.nutritionist) {
      let nutritionist = nutritionists.nutritionist.filter((nutritionist) => {
        return nutritionist.id === nutritionist_id
      })
      setNutritionist(nutritionist[0])
    }
  }

  useEffect(() => { 
    getNutritionist();
  }, [nutritionists]);
  
  useEffect(() => {
    dispatch(nutritionistsFetch());
  },[])


  const handleLogOut = () => {
    Cookies.remove('nutritionist_token_cookie');
    Cookies.remove("nutritionist_id_cookie");
    dispatch(nutritionistLogout()); 
    window.location.reload();
  }

  const deleteProfileNutritionist = (e) => {
    e.preventDefault()
    if (window.confirm("Vous êtes sur le point de supprimer votre compte. Êtes vous sur ?")) {
      dispatch(deleteNutritionistFetch());
      handleLogOut();
    }
  }

  return (
    <div className="dashboard-page page-padding">
      <div className="dashboard-page-left">
        <SidebarNutritionist />
      </div>
      <div className="dashboard-page-right my-5">
        <div className="container rounded patient-details col-lg-9 col-sm-12">
          <div className="row">
            <div className="col-md-6 border-right d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column align-items-center text-center ">
                <img
                  className="rounded-circle"
                  width="200px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  alt="profile"
                />
              </div>
            </div>
            <div className="col-md-5 mt-5 border-right text-primary-color">
              <div>
                <div>
                  <h1 className="text-right mx-0">
                    {nutritionist && nutritionist.first_name}{" "}{nutritionist && nutritionist.last_name}</h1>
                </div>
                <div className="my-2">
                  <div className="col-md-12 d-flex py-2">
                    <i className="align-self-center far fa-envelope"></i>
                    <div className="align-self-center mx-2">
                      {nutritionist && nutritionist.email}
                    </div>
                  </div>
                  <div className="col-md-12 d-flex py-2">
                    <i className="align-self-center fas fa-phone"></i>
                    <div className="align-self-center mx-2">
                      {nutritionist && nutritionist.phone_number}
                    </div>
                  </div>
                  <div className="col-md-12 py-2">
                    <div>
                      {nutritionist && nutritionist.slug_calendly }
                    </div>
                  </div>
                  <Link
                    exact
                    to="/nutritionist-edit-profile"
                    className="sidebar-nutritionist-link text-dark"
                  >
                    <div className="btn success-button text-center patient-edit-profile-button w-100 mt-4">
                      Modifier mon profil
                    </div>
                  </Link>
                  <form onSubmit={deleteProfileNutritionist}>
                    <input
                      className="btn danger-button text-white p-2 mt-4 w-100"
                      type="submit"
                      value="Supprimer mon compte"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistProfile;

