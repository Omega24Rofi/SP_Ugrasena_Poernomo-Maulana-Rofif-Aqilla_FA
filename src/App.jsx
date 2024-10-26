import './App.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useState,useEffect } from 'react';

function App() {
  // var for team id
  const teamid = 3224;
  // var for store time
  const [time, setTime] = useState(0);
  // var for coordinates
  const coordinates = [-7.783213, 110.367025];


  // timer function
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime((prevTime)=> prevTime +1);
    },1000);
    return()=>clearInterval(interval);
  },[]);

  // coordinates function
  useEffect

  const hours = Math.floor(time/3600);
  const minute = Math.floor((time%3600)/60);
  const second = time%60;
  


  return (
    <div className="App">
      <header className="w-full bg-primary flex justify-between align-middle h-[20%] py-3 px-4">
        <img src="/images/gmat_logo.png" alt="gmat-logo" className='h-[7vh]' />
        <div className='text-white text-right'>
          <p> id : {teamid}</p>
          <p> time : {String(hours).padStart(2, "0")}:{String(minute).padStart(2, "0")}:
          {String(second).padStart(2, "0")}</p>
        </div>
      </header>
      <main className='grid grid-cols-3 gap-4 w-full h-[40%] bg-cyan-500 p-10'>
        <div className='bg-blue aspect-[6/3] w-[100%]'>
          <MapContainer className="w-[100%] h-[100%]" center={coordinates} zoom={20}>
            <TileLayer url='https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'></TileLayer>
            <Marker position={[-7.783213, 110.367025]}>
              <Popup>
                halo
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
