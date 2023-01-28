import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import TextForm from './Components/TextForm';
import React, { useState } from 'react';
import Alert from './Components/Alert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [mode, setMode] = useState('light');

  const [alert, setAlert] = useState({
    messageAlert: ': Page refreshed successfully',
    typeAlert: 'Refresh',
  });

  setTimeout(() => {
    setAlert(null);
  }, 2000);

  const showAlert = (message, type) => {
    setAlert({ messageAlert: message, typeAlert: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const toggleMode = () => {
    // debugger;
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert(': Dark mode has been enabled', 'Success');
      document.title = 'TextUtils-Dark Mode';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert(': Light mode has been enabled', 'Success');
      document.title = 'TextUtils-Light Mode';
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title='Textutils'
          textHome='Home'
          textAbout='About Us'
          mode={mode}
          toggleMode={toggleMode}
        />
        <Alert alert={alert} />
        <div className='container mt-3'>
          <Routes>
            <Route exact path='/about' element={<About />} />

            <Route
              exact
              path='/'
              element={
                <TextForm
                  showAlert={showAlert}
                  heading='Enter the text to analyze'
                  mode={mode}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
