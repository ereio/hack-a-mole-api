/**
 * Login User
 */
export const checkAvailableEmail = async (parent, { email }, { models }) => {
  console.log('[checkAvailableEmail]', email, models);
  return false;
};

export const checkAvailableUsername = async (parent, { username }, { models }) => {
  console.log('[checkAvailableUsername]', username, models);
  return true;
};

/**
 * Login User
 */
export const loginUser = async (parent,
  {
    email, password,
  },
  { models },
) => {
  console.log(email, password, models);

  // firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(({user}) => {
  //         dispatch({
  //             type: LOGIN_SUCCESS,
  //             isAuthenticated: !!user,
  //             user
  //         })
  //     })
  //     .catch((error) => {
  //         dispatch({
  //             type: LOGIN_FAILURE,
  //             error: error.message
  //         })
  //     });
};

/**
 * Signup User
 */
export const signupUser = async (
  parent,
  {
    email, password, username,
  },
  { models },
) => {
  console.log(email, password, username, models);
  // firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then((response) => {
  //         console.log("CREATE RESPONSE", response);
  //         dispatch({
  //             type: CREATE_USER_SUCCESS
  //         })
  //     })
  //     .catch((error) => {
  //         dispatch({
  //             type: CREATE_USER_FAILURE,
  //             error: error.message
  //         })
  //     });
};

export const logoutUser = async (
  parent,
  {
    email, password, username,
  },
  { models },
) => {
  console.log(email, password, username, models);
  // firebase.auth().signOut()
  //     .then(() => {
  //         dispatch({
  //             type: LOGOUT_SUCCESS
  //         })
  //     })
  //     .catch((error) => {
  //         dispatch({
  //             type: LOGOUT_FAILURE,
  //             error: error.message
  //         })
  //     })
};
