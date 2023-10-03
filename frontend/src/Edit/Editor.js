import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, MemoryRouter } from 'react-router-dom';
import grapesjs from 'grapesjs';
import GjsEditor from '@grapesjs/react';
import './Editor.css';
import 'grapesjs-blocks-basic';
import 'grapesjs/dist/css/grapes.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ReactDOMServer from 'react-dom/server';
import Swal from 'sweetalert2';
import 'animate.css';

import AboutUs from '../AboutUs/AboutUs';
import Home from '../HomePage/Home';
import Activities from '../Activities/Activities';
import Showcase from '../Showcase/Showcase';
import Events from '../Events/Events';
import GetInvolved from '../GetInvolved/GetInvolved';
import RoomHire from '../RoomHire/RoomHire';
import ContactPage from '../Contact/Contact';
import LogIn from '../LogIn/Login';

const saveToDatabase = async (html, css, page) => {
  const backendUrl = 'http://localhost:5000';

  try {
    const response = await axios.post(`${backendUrl}/api/users/save-content`, {
      html,
      css,
      page
    });
    if (response.data.success) {
      Swal.fire({
        title: 'Saved!',
        icon: 'success',
        timer: 1300,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error("Error saving to database:", error);
  }
};



const EditorFuction = () => {
  const [currentSection] = useState(null);
  const [previewHtml] = useState("");
  const [previewCss] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const currentPageRef = useRef("");

  const loadPageContentFromServer = async (pageKey) => {
    const backendUrl = 'http://localhost:5000';
    try {
      const response = await axios.get(`${backendUrl}/api/users/load-content/${pageKey}`);
      if (response.data.success) {
        return response.data.html;
      }
    } catch (error) {
      console.error("Error loading from database:", error);
    }
    return ""; 
  }

  const createPreviewButton = (editor, label, Component, storageKey) => {
    const button = document.createElement('button');
    button.innerText = label;
    button.addEventListener('click', async () => {
      setCurrentPage(storageKey);
      currentPageRef.current = storageKey;

      let htmlContent = await loadPageContentFromServer(storageKey);
      if (!htmlContent) {
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
  editor.setComponents('');
  const buttonContainer = document.createElement('div');
  
  buttonContainer.appendChild(createPreviewButton(editor, 'Home', Home, 'Home'));
  buttonContainer.appendChild(createPreviewButton(editor, 'About Us', AboutUs, 'AboutUs'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Activities', Activities, 'Activities'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Showcase', Showcase, 'Showcase'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Events', Events, 'Events'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Get Involved', GetInvolved, 'Get Involved'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Room Hire', RoomHire, 'Room Hire'));
  buttonContainer.appendChild(createPreviewButton(editor, 'Contact Page', ContactPage, 'Contact Page'));
  
  editor.Panels.getPanel('options').set('appendContent', buttonContainer).trigger('change');

  editor.Panels.addButton('options', [{
    id: 'save-db',
    className: 'fa fa-floppy-o',
    command: 'save-db',
    attributes: { title: 'Save' }
  }]);
  

  editor.Commands.add('save-db', {
    run: function(editor, sender) {
      sender && sender.set('active', 0);
      const contentOnlyEl = editor.getWrapper().find('#content-only')[0];
      const html = contentOnlyEl ? contentOnlyEl.toHTML() : '';
      const css = editor.getCss();
      saveToDatabase(html, css, currentPageRef.current);
    }
  });

  editor.Commands.add('exit-command', {
    run: function(editor, sender) {
        window.location.href = "/"; 
    }
  });


  editor.Panels.addButton('options', [{
      id: 'exit-button',
      className: 'fa fa-sign-out',  
      command: 'exit-command',
      attributes: { title: 'Exit' }
  }]);
  
  
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
                  <AboutUs previewHtml={previewHtml} previewCss={previewCss} />
                </div>
      );

      case 3: return (
                <div className="loadedSectionContainer">
                  <Activities previewHtml={previewHtml} previewCss={previewCss} />
                </div>
      );

      case 4: return (
                <div className="loadedSectionContainer">
                  <Showcase previewHtml={previewHtml} previewCss={previewCss} />
                </div>
      );

      case 5: return (
                <div className="loadedSectionContainer">
                  <Events previewHtml={previewHtml} previewCss={previewCss} />
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
      <div className="pagePreview">
        {renderPreview()}
      </div>
    </div> 
  );
};

export default EditorFuction;