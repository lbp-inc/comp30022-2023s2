/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react';
import Layout from '../Layout';
import './AboutUs.css';
import axios from 'axios';

function useLoadContentFromDatabase(ref, pageKey) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://longbeachbackend-2c4b09f98b44.herokuapp.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/load/${pageKey}`); 
        if (response.data.success) {
          const { html, css } = response.data;

          if (html && css && ref.current) {
            ref.current.innerHTML = html;

            const styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.innerHTML = css;
            document.head.appendChild(styleElement);
          }
        }
      } catch (error) {
        console.error("Error loading data from database:", error);
      }
    };

    fetchData();
  }, [ref, pageKey, backendUrl]);
}


// function useLoadContentFromLocalStorage(ref, pageKey) {
    
//     useEffect(() => {
//     //  const mapContainer = document.getElementById(mapID); 
//       const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
//       const savedCss = localStorage.getItem(`savedCss${pageKey}`);
//       if (savedHtml && savedCss && ref.current) {
//         ref.current.innerHTML = savedHtml;

//         const styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         styleElement.innerHTML = savedCss;
//         document.head.appendChild(styleElement);

//         }
//     }, [ref, pageKey]);
//   }


function AboutUs() {
    const aboutUsRef = useRef(null);
    useLoadContentFromDatabase(aboutUsRef, 'AboutUs');

    return (
        <Layout>
        <div ref={aboutUsRef} id="AboutUs">
        <div id="content-only">
            <div className='aboutUsContainer'>
                <div className='banner'>
                    <h1>About us</h1>
                </div>

                <a id="history"> </a>
                <a id="philosophy"> </a>
                <div id='historyText' className='historyBox'>
                    <h1>Our History</h1>
                    <div className='historyText'>
                        Chelsea Neighbourhood House (CNH) had its early beginnings in the mid 1970s, 
                        on Broadway in Bonbeach, and became incorporated in 1988. In 2004 CNH relocated 
                        to 15 Chelsea Road, Chelsea and became Longbeach PLACE Inc (LBP).
                    </div>

                    <div className='philosophy' >'PLACE" is an acronym for Professional, Local, Adult Community Education.'</div>
                </div>

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
                            <li><a href="https://www.longbeachplace.org.au/_files/ugd/6d953a_bb41b716da784811a6ac85718391f337.pdf" target="_blank" rel="noreferrer">policies</a></li>
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
            </div>
        </div>
        </div>
        </Layout>
        
    );
}

export default AboutUs;