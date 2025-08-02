
////////////
import "./App.css";
import Home from "./Home";
import { deleteAccessToken } from "./utils/apis";


// App.js

import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "4m39hhf38sj5sa0agk8obe47nk";
    const logoutUri = "dknl0rn63sqgd.cloudfront.net";
    const cognitoDomain = "https://us-east-1prlfjww7n.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <button onClick={() => auth.removeUser()}>Sign out</button>
        <Home/>
      </>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;