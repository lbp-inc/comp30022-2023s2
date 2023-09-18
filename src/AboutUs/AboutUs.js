import React, {useEffect, useRef, useLayoutEffect} from 'react';
import Layout from '../Layout';
import './AboutUs.css';
import L from 'leaflet';
import uniqueID from '../HomePage/BottomPart';


function useLoadContentFromLocalStorage(ref, pageKey) {
    useEffect(() => {
      const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
      const savedCss = localStorage.getItem(`savedCss${pageKey}`);
      if (savedHtml && savedCss && ref.current) {
        ref.current.innerHTML = savedHtml;

        // const navbars = ref.current.querySelectorAll('navBar');
        // if (navbars.length > 1) {
        //   navbars[1].remove();
        // }

        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = savedCss;
        document.head.appendChild(styleElement);

        const mapContainer = localStorage.getItem(`savedHtml${pageKey}`);
        // const mapContainer = document.querySelector('myMapContainer');
        if (mapContainer) {

            if (window.myMap) {
              window.myMap.remove();
            }
    
            window.myMap = L.map(mapContainer).setView([-38.0507295, 145.1176978], 19);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(window.myMap);

            const marker = L.marker([-38.0507295, 145.1176978]).addTo(window.myMap);
          }
        }
    }, [ref, pageKey]);
  }

function AboutUs() {
    const aboutUsRef = useRef(null);
    useLoadContentFromLocalStorage(aboutUsRef, 'AboutUs');
    
    
    return (
        <div ref={aboutUsRef} id="AboutUs">
        <Layout>
        
        
            <div className='banner'>
                <h1>About us</h1>
            </div>

            <a id="history"> </a>
            <a id="philosophy"> </a>
            <div id='historyText' className='historyBox'>
                <h1>Our history</h1>
                <div className='historyText'>
                    Chelsea Neighbourhood House (CNH) had its early beginnings in the mid 1970s, 
                    on Broadway in Bonbeach, and became incorporated in 1988. In 2004 CNH relocated 
                    to 15 Chelsea Road, Chelsea and became Longbeach PLACE Inc (LBP).
                </div>

                <div className='philosophy' >'PLACE" is an acronym for Professional, Local, Adult Community Education.'</div>
            </div>``

            <div className='section1'>
                <div className='overview'>
                    We are proud to be one of the leading not-for-profit community based 
                    organisations within the City of Kingston which provides members of 
                    the community with opportunities for lifelong learning and skills development.
                </div>
                <div className='navList'>
                    <p>Welcome to Longbeach PLACE Inc.</p>
                    <ul>
                        <li><a href='#history'>History</a></li>
                        <li><a href='#philosophy'>Philosophy</a></li>
                        <li><a href='#whoWeAre'>Who we are</a></li>
                        <li><a href='#stakeholders'>Stakeholders</a></li>
                        <li><a href='#governanceCommittee'>Governance committee</a></li>
                        <li><a href='#members'>Meet our team</a></li>
                        <li>policies</li>
                    </ul>
                </div>
            </div>

            <a id="whoWeAre"> </a>
            <div className='section2'>
                <div className='whoWeAreTitle'>Who we are</div>
                <div className='whoWeAreText'>
                    <p>Longbeach PLACE Inc. works closely with a broad cross-section of local residents 
                    and community groups in Chelsea, creating an inclusive environment within the City 
                    of Kingston and its neighbouring suburbs. LBP Inc. responds to community needs by 
                    providing a range of structured educational programs, social activities, and special 
                    interest support groups. The programs and activities are developed through community 
                    consultation and are delivered by qualified facilitators and/or volunteers, who 
                    provide practical opportunities for lifelong learning skills development, wellbeing, 
                    and social activities.</p>
                    <p>LBP Inc's central location, close to public transport, also makes it a convenient 
                    option for facility hire for the local community.</p>
                </div>
            </div>

            <a id="stakeholders"> </a>
            <div className='section1'>
                <div className='stakeholdersTitleResponsive'>Stakeholders</div>
                <div className='stakeholdersText'>
                    <p>The LBP Inc. funding stakeholders include the Department of Families, Fairness 
                        and Housing (DFFH), the Neighbourhood House Coordination Program (NHCP), the 
                        City of Kingston and Adult Community Further Education (ACFE). In the past LBP 
                        Inc. has also received funding from philanthropic organisations and government 
                        grants.</p>
                </div>
                <div className='stakeholdersTitle'>Stakeholders</div>
            </div>

            <a id="governanceCommittee"> </a>
            <div className='section2'>
                <div className='governanceCommitteePic'></div>
                <div className='governanceCommitteeText'>
                    <p className='governanceCommitteeTitle'>Governance committee</p>
                    <p>The Governance Committee provides guidance to the organisation, which is managed 
                        by a committed team of part time staff and volunteers. Together we believe LBP 
                        Inc. if the PLACE for learning and development and social engagement.</p>
                    <p>Longbeach PLACE Inc employs a Manager and staff to run the office and administration. 
                        The Governance Committee members are not involved in administration but focus on the 
                        governance of the organisation. The Governance Committee work with the Manager to 
                        manage the organisation.</p>
                    
                    <a id="members"> </a>
                    <div className='members'>
                        <h3>Members:</h3>
                        <p>President - Penny Garrett</p>
                        <p>Vice President - Janine Chalmers</p>
                        <p>Treasurer - Albert Olenski</p>
                        <p>Secretary - Jane Court</p>
                        <p>General members - Chris Ewin, Rojer Leiberman, Sandra Wearne and Anna Wonnenberg</p>
                    </div>
                </div>
            </div>
        </Layout>
        </div>
        
    );
}

export default AboutUs;