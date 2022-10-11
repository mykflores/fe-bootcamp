import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, selectCounter } from "../../store/auth/authSelector";
import { setAuthState, setDecrement, setIncrement } from "../../store/auth/authSlice";

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() => dispatch(setAuthState(!authState))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </button>

    <div>
      <button
        onClick={() => dispatch(setDecrement(counter))
        }
      >
        MINUS
      </button>
      <div>{counter}</div>
      <button
        onClick={() => dispatch(setIncrement(counter))
        }
      >
        ADD
      </button>
      
      </div>
    </div>
  )
};

export default Home;