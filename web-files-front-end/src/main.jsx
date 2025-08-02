import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ItemDetails from "./ItemDetails.jsx";

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_prlfJWw7n",
  client_id: "4m39hhf38sj5sa0agk8obe47nk",
  redirect_uri: "https://dknl0rn63sqgd.cloudfront.net",
  response_type: "code",
  scope: "email openid phone",
};

createRoot(document.getElementById('root')).render(
  <AuthProvider {...cognitoAuthConfig}>
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<ItemDetails />} />
      </Routes>
    </div>
  </Router>
  </AuthProvider>
)