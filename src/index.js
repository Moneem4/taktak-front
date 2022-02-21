import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UiContextProvider } from './context/UiContext';
import { UserContextProvider } from './context/UserContext';
import { RestaurantContextProvider } from './context/RestaurantContext';
import { PostContextProvider } from './context/PostContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/client'

ReactDOM.render(
  
  <ApolloProvider client={client}>
    <React.StrictMode>
      <UserContextProvider>
        <RestaurantContextProvider>
          <UiContextProvider>
            <PostContextProvider>
              <DndProvider backend={HTML5Backend}>
                <App />
              </DndProvider>
            </PostContextProvider>
          </UiContextProvider>
        </RestaurantContextProvider>
      </UserContextProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
