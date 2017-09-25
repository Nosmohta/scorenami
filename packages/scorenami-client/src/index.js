import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: process.env.NODE_ENV === 'production' ? 'http://localhost:8000/graphql' : '/graphql'
});

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
