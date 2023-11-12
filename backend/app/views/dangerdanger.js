function DangerDanger(dangerToken) {
    return (
    `\
    <body>\
    <h1 style="color: darkred">Caution</h1>\
    <p>This operation is going to initialise activity section of the database, which will remove all existing records.</p>
    <p>If you wish to proceed, please add "/${dangerToken}" to the URL to confirm this operation. This operation cannot be undone.</p>\
    </body>\
    `);
}

export default DangerDanger;