const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        // account info
        $('.accountDetails').html(`<div>Logged in as: ${user.email}</div>`);
        $('#userEmail').html(user.email);
        // $('#searchSubmit').show();
        // $('#customRadio').show();
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide account info
        $('.accountDetails').html('');
        // $('#searchSubmit').hide();
        // $('#customRadio').hide();
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// getting data in the console
db.collection('userSavedSearches').where('user', '==', 'test@test.com').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
})

// getting data into the Account Modal
$("#dataBtn").on("click", (e) => {
    e.preventDefault();
    // get current user
    var cUser = $('#userEmail').html();
    db.collection('userSavedSearches').where('user', '==', cUser).get().then((snapshot) => {
        snapshot.forEach(doc => {
            // build list items for append into div
            var li = $("<li>");
            li.addClass("list-group-item list-group-item-custom");
            li.append(doc.data().timeStamp + " : " + doc.data().label.substring(0, 20));
            $('#table').append(li);
        })
    })
})

// empty the saved data list on Account Modal close
$("#account-modal-close").on("click", (e) => {
    e.preventDefault();
    $("#table").empty();
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
        timeStamp: $('#timeStamp').html(),
        relevancy: $('#relevancyDD option:selected').text(),
        comment: $('#commentText').val(),
        reaction: $('#severityDD option:selected').text()
    })
})