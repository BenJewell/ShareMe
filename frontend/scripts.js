
// function() {

// }

function generateID() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

console.log(generateID());

jQuery('#qrcode').qrcode(generateID().toString());