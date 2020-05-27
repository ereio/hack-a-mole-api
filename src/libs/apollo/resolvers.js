
import {
  loginUser,
  signupUser,
  checkAvailableEmail,
  checkAvailableUsername,
} from '../../users/resolvers';


export default {
  Query: {
    checkAvailableEmail,
    checkAvailableUsername,
  },
  Mutation: {
    loginUser,
    signupUser,
  },
};
