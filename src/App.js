import React from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import logo from './images/bridgitb-w.svg';
import Form from './components/Form';
import Grid from './components/Grid';

const App = () => (
  <>
    <header className="app-header">
      <img src={logo} alt="logo" />
      <div className="app-header-title">Bridgit - Frontend code challenge</div>
    </header>
    <section className="app-content">
      <Form />
      <Grid />
     <div>
     </div>
    </section>
  </>
);

export default App;
