// CONFIG IMPORTS
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";

// SERVICES IMPORTS
import { nutritionistsFetch } from 'services/apiManager';

// COMPONENTS IMPORTS
import NutritionistEditForm from "components/Forms/NutritionistEditForm";
import SidebarNutritionist from 'components/SidebarNutritionist';

// ASSETS IMPORTS
import profileDrawing from 'assets/images/nutritionist-profile-drawing.svg'




const NutritionistEditProfile = () => {
  const [nutritionist, setNutritionist] = useState();
  const nutritionist_id = parseInt(Cookies.get('nutritionist_id_cookie'));

  const nutritionists = useSelector(state => state.nutritionists)
  const dispatch = useDispatch()

  const getNutritionist = () => {
    if (nutritionists.nutritionist) {
      let nutritionist = nutritionists.nutritionist
        .filter((nutritionist) => {
          return nutritionist.id === nutritionist_id
        })
      setNutritionist(nutritionist[0])
    }
  }

  useEffect(() => {
    dispatch(nutritionistsFetch());
  },[])

  useEffect(() => {
    getNutritionist();
  }, [nutritionists]);


  return (
    <div className="dashboard-page page-padding">
      <div className="dashboard-page-left">
        <SidebarNutritionist />
      </div>
      <div className="background-of-edit-profile">
        <div className="details-container-alt control-edit-nutritionist-profile px-5 col-8">
          <div className="align-self-center constrol-edit-profile-nutritionist-picture">
            <img className="rounded-circle" width="400px" src={profileDrawing} alt="profile"/>
          </div>
          <div className="align-self-center">
          {
                nutritionist &&
                <NutritionistEditForm nutritionistData={nutritionist} />
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistEditProfile;