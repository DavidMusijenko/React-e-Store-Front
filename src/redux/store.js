import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

//persisted storage

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore, composeWithDevTools());

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
