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

// login
$("#loginSubmit").on("click", (e) => {
    e.preventDefault();

    // get user info
    var email = $("#login-email").val();
    var password = $("#login-password").val();

    // signup user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        $("#loginModal").find("form").trigger("reset");
        $("#loginModal").modal("hide");
    });
});

// logout
$("#logoutSubmit").on("click", (e) => {
    e.preventDefault();
    auth.signOut();
});