const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        // account info
        $('.accountDetails').html(`<div>Logged in as: ${user.email}</div>`);
        $('#userEmail').html(user.email);
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
db.collection('userSavedSearches').where('user', '==', 'blah@blah.com').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
})

// saving data
$("#searchSubmit").on("click", (e) => {
    e.preventDefault();
    db.collection('userSavedSearches').add({
        user: $('#userEmail').html(),
        upcTerm: $('#apiUPCTerm').html(),
        label: $('#apiLabel').html(),
        brand: $('#apiBrand').html(),
        category: $('#apiCategory').html(),
        contents: $('#apiContents').html(),
        timeStamp: $('#timeStamp').html()
    })
})