import {useReducer, createContext, useContext } from 'react'
import Sidebar from './components/SideBar';
import Center from './components/Center';
import './App.css';

function reducer(state,action){
  switch(action.type)
  {
    case "page":
      return {...state,page : action.payload};
    case "time":
      return {...state, time:action.payload};
    case "plans":
      return {...state, summary:{...state.summary,plans:action.payload}};
    case "addons":
      return {...state,summary:{...state.summary, addons:action.payload}};
    default:
      return state;
  }
}
const appContext = createContext(null);
export const useAppContext=()=> useContext(appContext);
function App() {
  const [ state, dispatch] = useReducer(reducer,{page:1, time:'month', summary:{plans:{title:"",price:0,time:"/mo"},addons:[{title:"",price:0,time:"/mo"}]}});
  const store ={...state,dispatch};
  return (
    <appContext.Provider value={store}>
    <div className="App__container">
      <Sidebar/>
      <Center />
    </div>
    </appContext.Provider>
  )
}

export default App
