import { menuArray } from './data.js'; // importing data

const btnEl = document.getElementById('order-btn')
const container = document.getElementById('container')
const menu_array = menuArray.map(function(item){
       return`
        <div class="item-slot">
            <p class="item-icon">${item.emoji}</p>
            <div class="item-details">
                <p data-name ="${item.id}">${item.name}</p>
                <p data-ing ="${item.id}"> ${item.ingredients}</p>
                <p data-price ="${item.id}">$${item.price}</p>
            </div>
            <button id="order-btn" class="item-button" data-btn="${item.id}">+</button>
        </div>
        `
}).join('')


document.addEventListener('click', function(e){
    console.log(e.target.dataset.btn)
})




function render(){
    document.querySelector('.container').innerHTML = menu_array
}

render()


