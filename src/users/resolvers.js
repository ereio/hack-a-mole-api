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
};
