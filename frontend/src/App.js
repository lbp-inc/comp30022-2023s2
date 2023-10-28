import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './HomePage/Home';
import AboutUs from './AboutUs/AboutUs';
import Activities from './Activities/Activities';
import Showcase from './Showcase/Showcase';
import Contact from './Contact/Contact';
import Events from './Events/Events';
import GetInvolved from './GetInvolved/GetInvolved';
import RoomHire from './RoomHire/RoomHire';
// import LogIn from './LogIn/Login';
import Editor from './Edit/Editor';
import EditorLogin from './Edit/EditorLogin';
import 'leaflet/dist/leaflet.css';
import React from 'react';

import Login from "./Membership/views/Login/login";
import Register from "./Membership/views/Register/register";
import ForgotPassword from "./Membership/views/ForgotPassword/forgot-password";
import ResetPassword from "./Membership/views/ForgotPassword/reset-password";
import PersonalInfo from "./Membership/views/PersonalInfo/personal-info";
import AdminPersonalInfo from "./Membership/views/PersonalInfo/admin-personal-info";
import MyBooking from "./Membership/views/MyBooking/my-booking";
import Notifications from "./Membership/views/Notifications/notifications";
import AdminNotification from "./Membership/views/Notifications/admin-notification";
import Content from "./Membership/views/Notifications/content";
import RegisterJump from "./Membership/views/jump/register-jump";
import ResetJump from "./Membership/views/jump/reset-jump";
import PersonalInfoContent from "./Membership/views/PersonalInfo/personal-info-content";
import EmailVerification from "./Membership/views/Register/email-Verification";
import EventsTimetable from './TimeTable/EventsTimetable';
import UserEventsTimetable from './TimeTable/UserEventsTimetable';
import TimeTable from './Membership/views/Timetable/timetable';
import FeeForServiceForm from "./Activities/Forms/FeeForService";
import ACFEForm from "./Activities/Forms/ACFE_Form";


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
                    {/* <Route path="/LogIn" element={<LogIn />} /> */}
                    <Route path="/Editor" element={<Editor />} />
                    <Route path="/EditorLogin" element={<EditorLogin />} />
                    <Route path="/Timetable" element={<EventsTimetable />} />
                    <Route path="/UserTimetable" element={<UserEventsTimetable />} />

                  {/* Membership */}
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                  <Route path="/reset-password/:username/:token" element={<ResetPassword />}></Route>
                  <Route path="/personal-info" element={<PersonalInfo />}></Route>
                  <Route path="/admin-personal-info" element={<AdminPersonalInfo />}></Route>
                  <Route path="/my-booking" element={<MyBooking />}></Route>
                  <Route path="/notifications" element={<Notifications />}></Route>
                  <Route path="/admin-notification" element={<AdminNotification />}></Route>
                  <Route path="/content/:username" element={<Content />}></Route>
                  <Route path="/register-jump" element={<RegisterJump />}></Route>
                  <Route path="/reset-jump" element={<ResetJump />}></Route>
                  <Route path="/personal-info-content" element={<PersonalInfoContent />}></Route>
                  <Route path="/email-verification" element={<EmailVerification/>}></Route>
                  <Route path="/admin-timetable" element={<TimeTable/>}></Route>


                  <Route path="/acfe_form" element={<ACFEForm />} />
                  <Route path="/fee_for_service_form" element={<FeeForServiceForm />} />
              </Routes>
          </div>
      </BrowserRouter>  

  );
}

export default App;
