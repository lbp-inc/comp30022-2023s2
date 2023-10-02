import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './HomePage/Home';
import AboutUs from './AboutUs/AboutUs';
import Activities from './Activities/Activities';
import Showcase from './Showcase/Showcase';
import Contact from './Contact/Contact';
import Events from './Events/Events';
import GetInvolved from './GetInvolved/GetInvolved';
import RoomHire from './RoomHire/RoomHire';
import LogIn from './LogIn/Login';
import Editor from './Edit/Editor';
import EditorLogin from './Edit/EditorLogin';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import axios from 'axios';


function App() {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://longbeachbackend-2c4b09f98b44.herokuapp.com';

      fetch(`${backendUrl}/backend/src/api`)
        .then((res) => res.json())
        .then((data) => setData(data.message));

        axios.get(`${backendUrl}/api/save`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching data", error);
        });

    }, []);


  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route path="/Activities" element={<Activities />} />
                  <Route path="/Showcase" element={<Showcase />} />
                  <Route path="/Contact" element={<Contact />} />
                  <Route path="/Events" element={<Events />} />
                  <Route path="/GetInvolved" element={<GetInvolved />} />
                  <Route path="/RoomHire" element={<RoomHire />} />
                  <Route path="/LogIn" element={<LogIn />} />
                  <Route path="/Editor" element={<Editor />} />
                  <Route path="/EditorLogin" element={<EditorLogin />} />

              </Routes>
          </div>
      </BrowserRouter>  

  );
}

export default App;
