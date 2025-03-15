firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("User is logged in", user);
    } else {
        console.log("No user logged in");
    }
});

let db = _db;

function register() {
    var inputUsername = document.querySelector("#username").value.trim();
    var inputPassword = document.querySelector("#password").value;
    var confirmPassword = document.querySelector("#cnf-password").value;

    if (!inputUsername || !inputPassword || !confirmPassword) {
        alert("All fields are required.");
        return false;
    }

    if (inputPassword !== confirmPassword) {
        document.querySelector("#cnf-password").value = '';
        document.querySelector("#cnf-password").placeholder = 'Password Mismatched';
        document.querySelector("#cnf-password").style.color = 'red';
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(inputUsername, inputPassword)
        .then((e) => {
            let cube = document.querySelector('.mydiv');
            cube.classList.toggle('styler');

            document.querySelector(".login input[type=email]").value = "";
            document.querySelector(".login input[type=password]").value = "";
            document.querySelector("#cnf-password").value = "";
            
            localStorage.setItem('user', JSON.stringify(e.user));

            db.child(`users/${e.user.uid}`).set({
                email: inputUsername,
                uid: e.user.uid
            }).catch(error => console.error("Database error:", error));
        })
        .catch((error) => {
            alert(error.message);
        });
    return false;
}

function login() {
    var inputUsername = document.querySelector("#username1").value.trim();
    var inputPassword = document.querySelector("#password1").value;

    if (!inputUsername || !inputPassword) {
        alert("All fields are required.");
        return false;
    }

    firebase.auth().signInWithEmailAndPassword(inputUsername, inputPassword)
        .then((e) => {
            db.child(`users/${e.user.uid}`).once('value', (snap) => {
                if (snap.val()) {
                    localStorage.setItem('user', JSON.stringify(e.user));
                    location.replace('./../../index.html');
                } else {
                    const user = firebase.auth().currentUser;
                    user.delete().then(() => {
                        alert('Your account has been deleted by the admin. Please register again.');
                    }).catch((error) => {
                        alert(error.message);
                    });
                }
            });
        })
        .catch((error) => {
            alert(error.message);
        });
    return false;
}
