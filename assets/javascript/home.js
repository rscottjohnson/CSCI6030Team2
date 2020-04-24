const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountData = document.querySelector('.accountData');
// const currUser = firebase.auth().current.User;

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

// getting data
db.collection('userSavedSearches').where('user', '==', 'test@test.com').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // renderData(doc);
        console.log(doc.data());
    })
})

$("#dataBtn").on("click", (e) => {
    e.preventDefault();
    var cUser = $('#userEmail').html();
    console.log(cUser);
    db.collection('userSavedSearches').where('user', '==', cUser).get().then((snapshot) => {
        snapshot.forEach(doc => {
            var li = $("<li>");
            li.addClass("list-group-item list-group-item-custom");
            li.append(doc.data().timeStamp + " : " + doc.data().label.substring(0, 20));
            $('#table').append(li);
        })
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
        timeStamp: $('#timeStamp').html(),
        relevancy: $('#relevancyDD option:selected').text(),
        comment: $('#commentText').val(),
        reaction: $('#severityDD option:selected').text()
    })
})

// create element & render data
function renderData(doc) {
    // let ol = document.createElement('ol');
    let td = document.createElement('td');
    let item = document.createElement('span');
    // let td = document.createElement('td');
    // let label = document.createElement('span');
    // let city = document.createElement('span');
    // let cross = document.createElement('div');

    item.setAttribute('data-id', doc.id);
    td.textContent = doc.data().label;
    // city.textContent = doc.data().city;
    // cross.textContent = 'x';

    // item.appendChild(label);
    td.appendChild(item);
    // ol.appendChild(li);
    // table.appendChild(tr);
    // li.appendChild(city);
    // li.appendChild(cross);

    $('#tableData').append(td);
}