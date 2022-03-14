var socket = io();
socket.emit('requestID')

socket.on('ID', (ID) => {
    console.log('id: ' + ID)
    jQuery('#qrcode').qrcode(ID.toString());
});
