// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
    }
});

// signup
$("#signupSubmit").on("click", (e) => {
    e.preventDefault();

    // get user info
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();

    // signup user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        $("#signUpModal").find("form").trigger("reset");
        $("#signUpModal").modal("hide");
    });
});