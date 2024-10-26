import './App.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useState,useEffect, useRef} from 'react';
import L from 'leaflet';
import CoordinateChart from './Component/Charts/coordinateChart'
import DataChart from './Component/Charts/dataChart'
import Plot from 'react-plotly.js';

function App() {
  // var for team id
  const teamid = 3224;
  // var for store time
  const [time, setTime] = useState(0);
  // var for coordinates
  const coordinates = [-7.783213, 110.367025];
  const [currentCoordinate, setCoordinate] = useState(coordinates);

  const mapRef = useRef();
 
  // var for random data
  const [data, setData] = useState({ x: [], y: [] });
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.x.length < 10) {
        setData({
          ...data,
          x: [...data.x, i],
          y: [...data.y, Math.random()],
        });
        setI(i + 1);
      }
    }, 1000);
  }, [data, i]);

  // timer function
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime((prevTime)=> prevTime +1);
    },1000);
    return()=>clearInterval(interval);
  },[]);

  // coordinates function
  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinate(([lat, lon]) => [lat + 0.00001, lon + 0.00001]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.flyTo(currentCoordinate, mapRef.current.getZoom(), {
          animate: true,
          duration: 1,
        });
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [currentCoordinate]);

  const hours = Math.floor(time/3600);
  const minute = Math.floor((time%3600)/60);
  const second = time%60;
  


  return (
    <div className="App">
      <header className="w-full bg-primary flex justify-between align-middle h-[20%] py-3 px-4 ">
        <img src="/images/gmat_logo.png" alt="gmat-logo" className='h-[7vh]' />
        <div className='text-white text-right'>
          <p> id : {teamid}</p>
          <p> time : {String(hours).padStart(2, "0")}:{String(minute).padStart(2, "0")}:
          {String(second).padStart(2, "0")}</p>
        </div>
      </header>
      <main className='w-[100%] h-[100%] p-4 flex flex-row flex-wrap justify-center align-middle '>
        <div className='flex flex-row w-full max-h-max h-[40vh] mb-10 gap-4 justify-center align-middle items-center'>
          <div className='map bg-blue aspect-[4/3] text-right w-1/2 h-[100%]'>
            <div className="descMap flex flex-row w-full justify-between">
              <p className='font-bold'>GPS</p>
              <div className="coordinate">
                <p>Lat : {currentCoordinate[0]}</p>
                <p>Lon : {currentCoordinate[1]}</p>
              </div>
            </div>
            <MapContainer className="w-[100%] h-[100%]" center={currentCoordinate} zoom={20} ref={mapRef}>
              <TileLayer url='https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'></TileLayer>
              <Marker position={currentCoordinate}>
                <Popup>
                  GMAT UGRASENA
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <CoordinateChart className='coordinate h-full w-1/2' coordinates={currentCoordinate} time = {time}/>
        </div>
        <div className='flex flex-row  w-full gap-2 h-fit justify-between align-middle mt-6'>
        <DataChart className='flex-1 h-full w-full' data={data} color={'grey'} title={'Voltage'} time={time}/> 
          <DataChart className='flex-1 h-full w-full' data={data} color={'purple'} title={'Pressure'} time={time}/> 
          <DataChart className='flex-1 h-full w-full' data={data} color={'green'} title={'altitude'} time={time}/> 
        </div>

      </main>
    </div>
  );
}

export default App;
