import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div></div>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept(() => {});
}
