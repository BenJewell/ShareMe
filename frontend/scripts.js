
// Socket managment
var socket = io();

socket.on('ID', (ID) => {
    console.log('id: ' + ID, typeof(ID))
    jQuery('#qrcode').qrcode(ID.toString());
});

// New session preparations
function initiate(type) {
    if (type === "phone") {
        // QR scanner
        function onScanSuccess(decodedText, decodedResult) {
            //console.log(`Code scanned = ${decodedText}`, decodedResult);
            sendData(decodedText, document.getElementById('url').value)
        }
        // var qrScanner = new Html5QrcodeScanner(
        //     "qr-reader", { fps: 10, qrbox: 350 });
        // qrScanner.clear()
        // qrScanner.render(onScanSuccess);

        var qrScanner = new Html5Qrcode("qr-reader");
        const config = { fps: 2 };
        qrScanner.start({ facingMode: "environment" }, config, onScanSuccess);
        qrScanner.render(onScanSuccess);
        alert(qrScanner.getState())

    }
    else if (type === "pc") {
        socket.emit('requestID')

        socket.on('URL', () => {
            console.log('Got a URL of ' + URL)
            window.open(URL)
        });
    }
}

// Phone page element managment
function setupPage(mode) {
    if (mode === "camera") {
        console.log("setting up page for camera")
        document.getElementById("qr-reader").style.display = "block";
        document.getElementById("code-box").style.display = "none";
    }
    else if (mode === "manual") {
        console.log("setting up page for code")
        document.getElementById("qr-reader").style.display = "none";
        document.getElementById("code-box").style.display = "block";
    }
}

// Pass data from phone to backend
function sendData(ID, URL) {
    socket.emit("giveDestination", ID, URL)
}