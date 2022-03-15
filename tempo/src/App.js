import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from "./pages/Homepage";
import Signup from './pages/Signup';

import Header from "./components/Header";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// link authLink and httpLink so every request retrieves the token
// and sets the request headers before making the request to the API.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
