import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.jsx';
import Hero from "./components/Hero/hero.jsx";
import About from "./components/about_us/about_us.jsx";  
import { Contact } from './components/contact/Contact.jsx';
import Admin from './components/admin/admin.jsx';
 /* import Explore from './components/explore/explore.jsx';
 */


function App() {
  const heroData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give in to", text2: "your passions" }
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-container">

      <Routes>
      <Route path='/' element={<Hero
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
        />}/>
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/admin' element={<Admin/>} />
     {/*    <Route path='/explore' element={<Explore/>} /> */}

       
      </Routes>
        </div>


    
    </div>
  );
}

export default App;
