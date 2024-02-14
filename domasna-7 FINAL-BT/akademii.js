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


class Academy {
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
    const initCards = document.querySelector('.card-academy');
    if(initCards){
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

}

function renderAcademic(academies) {
    console.log("VVV")
    const initCards = document.querySelector('.card-academy1');
    if(initCards){
    const academiesWraper = document.createElement('div');
    academiesWraper.classList.add("academies");
    for(let i=0;i<academies.length-2;i++){
        let academy = academies[i]
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

    }
  
    console.log(initCards)
    initCards.remove();
    document.body.appendChild(academiesWraper);
    onLoadCartNumbers();
    document.getElementById('cartBtn').onclick = () => renderAddedAcademies()
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

