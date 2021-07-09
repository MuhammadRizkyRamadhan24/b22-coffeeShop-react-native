import {combineReducers} from 'redux';

// import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import carts from './carts';
import auth from './auth';
import products from './products';
import categories from './categories';
import transactions from './transactions';
import user from './user';

// const persistAuth = {
//   storage,
//   key: 'carts',
// };

const rootReducer = combineReducers({
  auth,
  carts,
  products,
  categories,
  transactions,
  user,
});

export default rootReducer;
