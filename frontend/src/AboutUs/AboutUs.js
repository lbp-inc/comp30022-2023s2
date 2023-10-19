/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react';
import Layout from '../Layout';
import './AboutUs.css';
import axios from 'axios';

function useLoadContentFromDatabase(ref, pageKey) {
  const backendUrl  = 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/load-content/${pageKey}`); 
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
                    </div>
                </div>

                <a id="members"> </a>
                <div className='membersContainer'>
                    <p className='membersTitile'>Members</p>
                    <ul>
                        <li>
                            <h2>Chris Ewin - President</h2>
                            <p>Chris has completed a PhD in Computer Science,He is currently an Associate Lecturer in Computing Information Systems at the University of Melbourne and runs an IT business, Enhance Computer Services. He is also a volunteer facilitator at the Chelsea PC Support Group, which he has helped coordinate for over 20 years. Chris joined the Governance Committee in mid-2018.</p>
                        </li>
                        <li>
                            <h2>Penny Garrett - Vice President</h2>
                            <p>Penny Garrett is a local resident to Chelsea, moving here to raise her 3 young boys in this wonderful community! Penny brings with her a wealth of experience leading large teams across ANZ and international, from large multi-national corporations to Education and Public Sector. Passionate about training, social welfare and strong governance, she has a degree in Psychology and a Masters in Business Administration (MBA). Penny is energised and committed to supporting LBP in achieving their strategic and growth-based objectives.</p>
                        </li>
                        <li>
                            <h2>Anne Wonneberger - Secretary/Treasurer</h2>
                            <p>As a student in France in the 1980's Anne volunteered in the creation and development of one of the first radio FM stations, interviewing local people and providing free advertising for community events and opportunities. Having worked in a consulting firm, she developed expertise in publishing, leading to managerial roles in a group of 60+ magazines, including "Elle". After moving with her family to Australia, Anne unsuccessfully followed the challenging process of validating her overseas qualifications (Scientific Master). Since settling in Kingston, Anne has volunteered and/or worked for four community organisations, using her life experience to help others less fortunate, and learning from an amazing diversity of people their personal stories and challenges. In 2019, she was invited to contribute to activities at Longbeach PLACE and was elected to the Committee.</p>
                        </li>
                        <li>
                            <h2>Albert Olenski - General Member</h2>
                            <p>Albert comes from primarily a financial services background, namely wealth management and Capital markets. As part of these roles, he was involved not only in the technical aspects but also stakeholder management and client Communication. He has also been involved with several not-for-profit organisations throughout his career.</p>
                        </li>
                        <li>
                            <h2>Jane Court-Secretary</h2>
                            <p>Jane Court (nee Woodhead) is a near-lifetime Chelsea resident, born Chelsea Bush Nursing Hospital, schooled at Bonbeach State and High Schools, and lives on land once owned by her Great Grandparents in Edithvale. Jane volunteered, taught,and worked at the Chelsea Neighbourhood House on Broadway and through the move to Longbeach PLACE on Chelsea Road. She then worked in Training and Assessment, and staff development at Chisholm and studied post-graduate degrees in adult learning. She loves her dogs, sons, SciFi and theatre.On retirement, she was thrilled to join the Longbeach Governance Committee to give back io the community that gave so much to her.</p>
                        </li>
                        <li>
                            <h2>Rojer Liberman - General Member</h2>
                            <p>Rojer moved to Chelsea in 2001 and started the Chelsea PC Support Group on the first Saturday of May 2002, located in Broadway Chelsea. Rojer has previously been in business for over 20 years and is an active participant in the Chelsea community.</p>
                        </li>
                        <li>
                            <h2>Janine Chalmers - General Member</h2>
                            <p>Janine has lived and raised her family within the City of Kingston most of her life. She recently retired from 27 years in business and previously had over 25 years as a nurse and midwife throughout Melbourne. Over the years, Janine has enjoyed contributing to the local community in several organisations throughout the area. She discovered Longbeach Place through attending a course and joined the Governance committee in November 2022.</p>
                            <p>Janine is passionate about bringing out the best in people and believes that Longbeach Place can make an even bigger impact in our local community,Utilising her background in the caring professions of nursing, combined with an extensive business background, Janine is eager and excited to see Longbeach Place flourish as a local centre, having a positive impact in the local community.</p>
                        </li>
                        <li>
                            <h2>Sandra Wearne - General Member</h2>
                            <p>Born and raised in Edithvale, Sandra worked in her parents' hairdressing and tobacconist shop, before marrying and moving to Seaford. After raising 3 children and teaching swimming for 10 years,Sandra worked as a rep for various Smallgoods companies. Now retired, Sandra and her husband live at the Lifestyle Village, Chelsea Heights, where she was Social Club President for 4 years. Sandra joined Longbeach Place 17 years ago and is a member of the computer club. She looks forward to contributing as a member of the Governance Committee.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
        </Layout>
        
    );
}

export default AboutUs;