(function () {
    // Ensure Firebase Authentication is fully loaded before checking the user
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            location.href = './pages/signin-signup/signin.html';
        }
    });

    // Fetch and display mobiles
    _db.child('mobiles').on('value', (snap) => {
        let target = document.querySelector('.mobile-show');
        if (!target) return;

        let data = snap.val();
        if (!data) return;

        let arr = Object.values(data).slice(0, 4).reverse(); // Get first 4 items and reverse

        target.innerHTML = arr.map((e) => {
            return `
                <div class="card col-12 col-md-6 p-3 col-lg-3">
                    <div class="card-wrapper">
                        <div class="card-img">
                            <img src="${e.image}" alt="pic" title="${e.name}" />
                        </div>
                        <div class="card-box">
                            <h4 class="card-title mbr-fonts-style display-5">
                                ${e.brand} ${e.name}<br /><br />
                            </h4>
                            <p class="mbr-text mbr-fonts-style display-7">
                                Weight: 157g <br />Dimensions: 149.9 x 70.4 x 7.8mm <br />OS:
                                Android 9 <br />Screen size: 6.1-inch <br />Resolution: QHD+
                                <br />CPU: Octa-core chipset <br />RAM: 8/12 GB<br />Storage:
                                128/512GB <br />Battery: 3,400mAh <br />Rear camera: 16MP +
                                12MP + 12MP <br />Front camera: 10MP &nbsp; &nbsp;
                            </p>
                            <!--Btn-->
                            <div class="mbr-section-btn align-center">
                                <a href="./pages/mobile-detail/mobile-detail.html?id=${e._id}" class="btn btn-white-outline display-4">
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
        }).join('');
    });

})();

// Sign out function
function signout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('user');
            location.href = './pages/signin-signup/signin.html';
        })
        .catch((err) => {
            alert(err.message);
        });
}
