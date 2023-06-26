import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "../store/user/user.types";
import { INITIAL_STATE, userReducer } from "../store/user/user.reducer";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }

  const value = { currentUser, setCurrentUser };

  useEffect(
    () => {
      const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }

        setCurrentUser(user);
      });

      return unsubscribe;
    },
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
