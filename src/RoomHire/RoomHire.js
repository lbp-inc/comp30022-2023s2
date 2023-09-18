import React from 'react';
import Layout from '../Layout';
import './RoomHire.css'
import room1Image from '../image/event.webp';
import room2Image from '../image/event.webp';
import room3Image from '../image/event.webp';
import room4Image from '../image/event.webp';
function RoomHire() {
    const blocks = [
        { title: "Chelsea Room 1 & Thames Room 2", text: "Chelsea Room 1 and Thames Room 2 can be utilised together as one large space, or divided into two spaces. This large space is great for meetings, exercise based classes, art groups (there are sinks available) and for community morning teas/lunches (we have urns and a small fridge available for use in these rooms and it is connected via a serving window to the kitchen).", image: room1Image },
        { title: "Broadway Room 3 & Swanpool Room 4", text: "Broadway Room 3 & Swanpool Room 4 are dedicated I.T rooms-with laptops or can be set as required.", image: room2Image },
        { title: "Oakwood Room 5", text: "Oakwood Room 5 is also available to be hired and set in a number of formats.", image: room3Image },
        { title: "Kingston Room 6", text: "​ Kingston Room 6 is a fantastic space for smaller meetings and we also run pilates/yoga classes in this carpeted room.", image: room4Image }
    ];
    return (
        <Layout>
            <div className='newsTitleHire'>
                <h1>RoomHire</h1>
            </div>
            <div className="roomHireContainer">
            {blocks.map((block, index) => (
                <div key={index} className="roomRow">
                    <div className="imageContainer">
                        <img src={block.image} alt={block.title} />
                    </div>
                    <div className="textContainer">
                        <h3>{block.title}</h3>
                        <p>{block.text}</p>
                        <button>Learn More</button>
                    </div>
                </div>
            ))}
            <div className="behindText">
                For more information regarding room hire, please contact us on 9776 1386. 
            </div>
            <div className="behindText">
                After hours information: LBP building is owned by City of Kingston Council Phone: 1800 653 356 in case of an emergency. Our location is 15 Chelsea Rd, Chelsea
            </div>
            <div className="behindText">
                Chelsea Police: 8773-3200. Their location is 312 Station Street, Chelsea
            </div>
            <div className="behindText">
                Fire Police Ambulance 000             SES Victoria 132 500
            </div>
            <div className="buttonContainer">
                <button className="downloadButton">Regular/Casual Room Rental</button>
                <button className="downloadButton">Venue Hire Information Flyer</button>
            </div>

        </div>

        </Layout>
    );
}

export default RoomHire;
