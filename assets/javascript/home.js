const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        // account info
        $('.accountDetails').html(`<div>Logged in as: ${user.email}</div>`);
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide account info
        $('.accountDetails').html('');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// getting data
db.collection('upcScans').where('label', '==', 'ORGANIC BLUE CORN TORTILLA CHIPS').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
})

// saving data
$("#upcScanSubmit").on("click", (e) => {
    e.preventDefault();
    db.collection('upcScans').add({
        upc: $('#upcCode').html(),
        label: $('#upcLabel').html(),
        brand: $('#upcBrand').html(),
        category: $('#upcCategory').html()
    })
})