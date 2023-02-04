import React, { useEffect } from "react";
import Places from "../Places/Places";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../redux/actions";
import FormResult from "../FormResult/FormResult";
import Admin from "../Admin/Admin";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveUser());
  }, []);

  const userExist = useSelector((state) => state.user);

  return(
    <div>
      {userExist && userExist[0] && userExist[0].team === 'Admin' ? 
      <Admin/> :
      <div>
       {userExist[0] ? (
          <div>
            <NavBar />
            <Places />
            <FormResult/>
          </div>
        ) : (
          "Ingrese para continuar"
        )}
      </div>
    }
    </div>
  )
};

export default Home;
