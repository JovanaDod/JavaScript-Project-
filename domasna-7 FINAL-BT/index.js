

function validateSecondForm(email) {
    const formDataTwo = new FormData(document.forms.loginForm);
    document.querySelector('#name-error').innerText = email ? " " : "Email is required!";

}

document.getElementById('registerBtn');
const registerBtn = document.getElementById('registerBtn');
registerBtn.addEventListener('click', onRegisterSubmit);

const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', onLoginSubmit);

function validateForm(email, password) {
    document.querySelector('#uname-error').innerText = email ? " " : "Email is required!";
    document.querySelector('#psw-error').innerText = " ";
    if (!password) {
        document.querySelector('#psw-error').innerText = "Password is required!"
    } else if (password.length <= 10) {
        document.querySelector('#psw-error').innerText = "Password must have at least 10 characters!"
    } else if (!validateChars(password)) {
        document.querySelector('#psw-error').innerText = "Password must contain a special character!"
    }
}

function validateChars(password) {
    const specialChars = ["!", "@", "#", "$", "%"];
    for (let i = 0; i < password.length; i++) {
        if (specialChars.includes(password[i])) {
            return true;
        }
    }
    return false;
}

function onRegisterSubmit() {
    const formData = new FormData(document.forms.registerForm);
    const email = formData.get('uname');
    const password = formData.get('psw');
    validateForm(email, password);
    if (email && password) {

        fetch('https://63407044d1fcddf69cb8c368.mockapi.io/users', {
            method: "POST",
            body: JSON.stringify({email, password}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        console.log("Formata e validirana");
    } else if (!email && !password) {
        validateForm(email, password)
    }
}

function generateRandomId(max) {
    return Math.round(Math.random() * max);

}

function onLoginSubmit() {
    const formData = new FormData(document.forms.loginForm);
    const email = formData.get('name');
    validateSecondForm(email);

    if (email) {
        fetch('https://63407044d1fcddf69cb8c368.mockapi.io/users')
            .then((response) => response.json())
            .then((response) => {
                const randomId = generateRandomId(response.count);
                console.log(localStorage.getItem("user"));
                fetch(`https://63407044d1fcddf69cb8c368.mockapi.io/users/${randomId}`)
                    .then((response) => response.json())
                    .then((userData) => {
                        localStorage.setItem('user', JSON.stringify(userData));
                        // Da se zatvori modalot i da se skrijat login/register kopcinjata, na nivno mesto da dojde
                        // account kopce
                        console.log("User Data:", userData);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            })
        console.log("Formata e validirana");
    } else if (!email) {
        validateSecondForm(email);
    }
    console.log("test");
}

function validateSecondForm(email) {
    document.querySelector('#name-error2').innerText = email ? " " : "Email is required!";
}

function isLoggedIn() {
    return !!localStorage.getItem('user')
}


if (isLoggedIn()) {
    // Da se smenat kopcinjata
}

console.log(isLoggedIn())

// on and off od koga ke pomine submit formata gore vo kjos menuvam boja

// klasi koga sakas da kreiras podatoci se upotrebuva 


 /*class Academy {
    constructor(params) {
        this.createdAt = params.createdAt;
        this.date = params.date;
        this.id = params.id;
        this.image = params.image;
        this.name = params.name;
        this.place = params.place;
        this.price = params.price;
        this.speakers = params.speakers;


    }

    getPrice() {
        return `Price: $${this.price}`
    }
}

fetch('https://63407044d1fcddf69cb8c368.mockapi.io/academies')
    .then(res => res.json())
    .then(academic => {
        const nesto = academic.map((academy) => new Academy(academy))
        renderAcademic(nesto);
    });

function renderAcademic(academies) {
    console.log("vvv")
    const initCards = document.querySelector('.card-academy');
    const academiesWraper = document.createElement('div');
    academiesWraper.classList.add("academies");
    academies.forEach((academy) => {
        const academyDiv = document.createElement('div');
        console.log('academyDiv', academyDiv)
        academyDiv.classList.add('academy');
        academyDiv.innerHTML = initCards.innerHTML;

        academyDiv.children[0].src = academy.image;
        academyDiv.children[1].innerHTML = academy.name;
        academyDiv.children[2].innerHTML = academy.place;
        academyDiv.children[3].innerHTML = academy.getPrice();
        academyDiv.children[4].innerHTML = academy.speakers;
        academyDiv.children[5].onclick = () => addToCart(academy)


        academiesWraper.appendChild(academyDiv);

    })
    console.log(initCards)
    initCards.remove();
    document.body.appendChild(academiesWraper);
    onLoadCartNumbers();
    document.getElementById('cartBtn').onclick = () => renderAddedAcademies()
}

function onLoadCartNumbers() {
    const academies = JSON.parse(localStorage.getItem('academies'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        if (academies && academies[user.id]) {
            document.getElementById("cartNumber").innerText = academies[user.id].length;
        }
    } else {
        // location.href = location.href.replace('akademii.html', 'index-7.html')
    }
}

function renderAddedAcademies() {
    const academies = JSON.parse(localStorage.getItem('academies'));
    const user = JSON.parse(localStorage.getItem('user'));
    const cartModalBody = document.getElementById('cart-items-modal');

    if (user && academies && academies[user.id]) {
        console.log('added academies', academies[user.id]);
        let priceSum = 0;
        academies[user.id].forEach((academy) => {
            const academyWrapperDiv = document.createElement('div');
            academyWrapperDiv.classList.add('card-academy-row');
            const academyName = document.createElement('p');
            academyName.innerText = `Name: ${academy.name}`;
            const academyPrice = document.createElement('p');
            academyPrice.innerText = `$${academy.price}`;
            priceSum += parseInt(academy.price);

            academyWrapperDiv.append(...[academyName, academyPrice])
            cartModalBody.appendChild(academyWrapperDiv);
        })

        const totalPrice = document.createElement('p');
        totalPrice.innerText = `Total: $${priceSum}`;
        cartModalBody.appendChild(totalPrice);
    }
}


function addToCart(academy) {
    let academies = JSON.parse(localStorage.getItem('academies'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (academies && academies[user.id]) {
        academies[user.id] = [...academies[user.id], academy];
    } else {
        if (!academies) {
            academies = {};
        }
        academies[user.id] = [academy];
    }


    localStorage.setItem('academies', JSON.stringify(academies));
    document.querySelector(".cart span").textContent = academies[user.id].length;
}

*/