import React, { useState, useEffect , useRef} from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import grapesjs, { Editor } from 'grapesjs';
import GjsEditor from '@grapesjs/react';
import './Editor.css';
import 'grapesjs-blocks-basic';
import 'grapesjs/dist/css/grapes.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ReactDOMServer from 'react-dom/server';
import Swal from 'sweetalert2';
import 'animate.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import AboutUs from '../AboutUs/AboutUs';
import Home from '../HomePage/Home';
import Activities from '../Activities/Activities';
import Showcase from '../Showcase/Showcase';
import Events from '../Events/Events';
import GetInvolved from '../GetInvolved/GetInvolved';
import RoomHire from '../RoomHire/RoomHire';
import ContactPage from '../Contact/Contact';
import LogIn from '../LogIn/Login';


const EditorFuction = () => {
  const [currentSection] = useState(null);
  const [previewHtml] = useState("");
  const [previewCss] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const currentPageRef = useRef("");

  const createPreviewButton = (editor, label, Component, storageKey) => {
    const button = document.createElement('button');
    button.innerText = label;
    button.addEventListener('click', () => {
      let htmlContent;
      setCurrentPage(storageKey);
      currentPageRef.current = storageKey;
      const savedHtml = localStorage.getItem(`savedHtml${storageKey}`);
      if (savedHtml) {
        htmlContent = savedHtml;
      } else {
        htmlContent = ReactDOMServer.renderToString(
        <MemoryRouter>
          <Component />
        </MemoryRouter>
       );
      }
      editor.setComponents(htmlContent);
    });
    return button;
  };


  const onEditor = (editor) => {
  const buttonContainer = document.createElement('div');
  
  buttonContainer.appendChild(createPreviewButton(editor, 'Home', Home, 'Home'));
  buttonContainer.appendChild(createPreviewButton(editor, 'About Us', AboutUs, 'AboutUs'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Activities', Activities, 'Activities'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Showcase', Showcase));
  buttonContainer.appendChild(createPreviewButton(editor, 'Events', Events));
  buttonContainer.appendChild(createPreviewButton(editor, 'Get Involved', GetInvolved));
  buttonContainer.appendChild(createPreviewButton(editor, 'Room Hire', RoomHire));
  buttonContainer.appendChild(createPreviewButton(editor, 'Contact Page', ContactPage));
  
  editor.Panels.getPanel('options').set('appendContent', buttonContainer).trigger('change');

  editor.Panels.addButton('options', [{
    id: 'save-db',
    className: 'fa fa-floppy-o',
    command: 'save-db',
    attributes: { title: 'Save DB' }
  }]);
  
  editor.Commands.add('save-db', {
    run: function(editor, sender) {
      sender && sender.set('active', 0); 
      const html = editor.getHtml();
      const css = editor.getCss();
      localStorage.setItem(`savedHtml${currentPageRef.current}`, html);
      localStorage.setItem(`savedCss${currentPageRef.current}`, css);

      Swal.fire({
        title: 'Saved!',
        icon: 'success',
        timer: 1300,        
        showConfirmButton: false,
        showClass: {
          animate__flash: 'animate__animated animate__fadeInDown'
          },
        hideClass: {
          animate__flash: 'animate__animated animate__fadeOutUp'
          }
    })
    }
  });
  
};

  const renderPreview = () => {
    switch (currentSection) { 
      case 1: return (
                <div className="loadedSectionContainer">
                  <Home previewHtml={previewHtml} previewCss={previewCss} />
                </div>
      );

      case 2: return (
                <div className="loadedSectionContainer">
                  <AboutUs />
                </div>
      );

      case 3: return (
                <div className="loadedSectionContainer">
                  <Activities />
                </div>
      );

      case 4: return (
                <div className="loadedSectionContainer">
                  <Showcase />
                </div>
      );

      case 5: return (
                <div className="loadedSectionContainer">
                  <Events />
                </div>
      );

      case 6: return (
                <div className="loadedSectionContainer">
                  <GetInvolved />
                </div>
      );

      case 7: return (
                <div className="loadedSectionContainer">
                  <RoomHire />
                </div>
      );

      case 8: return (
                <div className="loadedSectionContainer">
                  <ContactPage />
                </div>
      );

      case 9: return (
        <div className="loadedSectionContainer">
          <LogIn />
        </div>
      );
      

      default: return null;
    }
  };

  return (
    <div className="container">
      {/* GrapesJS 容器 */}
      <GjsEditor
        grapesjs={grapesjs}
        options={{
          height: '100vh',
          storageManager: false,
        }}
        plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
        ]}
        onEditor={onEditor}
      />
      <div id="custom-section-select" className="custom-section-select"></div>
      <div className="topBar">
        <div className="exitEditor">
          <Link to="/">
            <FontAwesomeIcon icon={faRightFromBracket} className="exitEditorButton" />
          </Link>
        </div>
      </div> 
      <div className="pagePreview">
        {renderPreview()}
      </div>
    </div> 
  );
};

export default EditorFuction;