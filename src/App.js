import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import React from "react";
import Checkout from "./components/Checkout"
export const config = {
  endpoint: `https://qcartbynitin.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/">
          <Products/>
        </Route>
        <Route path= "/register">
        <Register />  
        </Route>
        <Route path= "/login">
        <Login />  
        </Route>
        <Route path= "/checkout" component={Checkout}/>
      </Switch>
      
    </div>
  );
}

export default App;
