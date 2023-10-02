import React from 'react';
import './Login.css';
import Layout from '../Layout';

function Login() {
        //{show}
        //if(!show){
        //    return null;
        //}

        return (
            
        <Layout>
            <div className="loginSection">
            
            <div className="loginTitle">
                <p>Login Portal</p>
            </div>
        
            <div className="loginTable">
                <table>
                <tr>
                    <td>
                        <h2 className="loginPlaceTitle">Memeber Login</h2>
                        <p className="loginPlaceDescription">Use your Member Account to access the membership dashboard</p>
                        <p className="loginPlace">
                            <input type="button" className="memberLogin" value="Member Login >"></input>
                        </p>
                    </td>
                    
                    <td>
                        <h2 className="loginPlaceTitle">Staff/Tutor Login</h2>
                        <p className="loginPlaceDescription">Use your Staff/Tutor Account to access the Staff/Tutor dashboard</p>
                        <p className="loginPlace">
                        <input type="button" className="memberLogin" value="Staff/Tutor Login >"></input>
                        </p>
                    </td>

                </tr>
                </table>

                </div>
            
            </div>
        </Layout>

    );
}

export default Login;