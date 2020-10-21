import { initStore } from './store';

const configureStore = () => {
  const actions = {
    logIn: (curState, productId) => {
        
        return {  };
      }
    }
  
  initStore(
    actions, 
    {isLoggedIn: false});
};

export default configureStore;