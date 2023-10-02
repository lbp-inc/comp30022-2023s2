import React from 'react';
import './Sponser.css';
import kingstonLogo from '../image/kingston.webp';
import learnlocalLogo from '../image/Learn_Local_log0.webp';
import NeighbourhoodLogo from '../image/tl.webp';
import VictoriaGovernmentLogo from '../image/VictorianGovernment_logo.webp';

function Sponser() {
    return (
        <div className="sponserSection">
            
            <div className="sponserTitle">
                <h1>Supported by</h1>
            </div>
        
            <div className="sponserlogo">
            <table>
            <tr>
                <td>
                    <a href="https://www.kingston.vic.gov.au/Home" target="_blank" rel="noopener noreferrer">
                        <img src={kingstonLogo}  width="295.5" height="138.75" alt="The logo of Kingston"/>
                    </a>
                </td>

                <td>
                    <a href="https://learnlocal.org.au/" target="_blank" rel="noopener noreferrer">
                        <img src={learnlocalLogo}  width="182.25" height="121.5" alt="The logo of Learn Local"/>
                    </a>
                </td>

                <td>
                    <a href="https://www.nhvic.org.au/" target="_blank" rel="noopener noreferrer">   
                        <img src={NeighbourhoodLogo}  width="225" height="136.125" alt="The logo of Neighbourhood Logo"/>
                    </a>
                </td>

                <td>
                    <a href="https://www.vic.gov.au/" target="_blank" rel="noopener noreferrer">
                        <img src={VictoriaGovernmentLogo}  width="216" height="121.5" alt="The logo of Victoria Government Logo"/>
                    </a>
                </td>
            </tr>
            </table>

            </div>
            
        </div>
    );
}

export default Sponser;