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


function App() {
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
