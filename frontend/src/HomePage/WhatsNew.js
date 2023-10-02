import React from 'react';
import './WhatsNew.css';


import whatsNewImage from '../image/whatsNew.webp';
import eventImage from '../image/event.webp';
import ourServiceImage from '../image/ourService.webp';

function WhatsNew() {

    const sections = [
        { title: "Activity", image: whatsNewImage },
        { title: "LongBeach News", image: eventImage },
        { title: "Event", image: ourServiceImage }
    ];

    return (
        <div className="whatsNewContainer">
            {sections.map((section, index) => (
                <div key={index} className="whatsNewSection">
                    <button onClick={() => console.log(`${section.title} clicked!`)}>
                        <h2>{section.title}</h2>
                        <img src={section.image} alt={section.title} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default WhatsNew;
