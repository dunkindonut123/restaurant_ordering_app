import { menuArray } from './data.js'; // importing data

const btnEl = document.getElementById('order-btn')
const container = document.getElementById('container')
const totalEl = document.getElementById('total-price')
const orderList = []
let total = 0
let order_count = 0

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

// getting the object based on the button clicked
document.addEventListener('click', function(e){
    if(e.target.dataset.btn){
        const target_item = menuArray.find(item => item.id == e.target.dataset.btn)

        let template_html = `
        <div class="order-bar">
            <div class="name-remove">
                <p>${target_item.name}</p>
                <button id="remove-btn" data-idx = "${order_count}">remove</button>
            </div>
            <p id="order-price">$${target_item.price}</p>
        </div>
        `
        order_count++
        total += target_item.price
        totalEl.textContent = `$${total}`
        orderList.push(template_html)
        document.querySelector('.order-list').innerHTML = orderList.join('')
    }
})

document.addEventListener('click', function(e){
    if(e.target.dataset.idx){
        console.log(e.target.dataset.idx)
        orderList.splice(e.target.dataset.idx, 1)
        order_count --
        document.querySelector('.order-list').innerHTML = orderList.join('')
    }
})

// assigning id from 0 - x each render to the remove button, get that specific button and get parent class 2x and remove div?





function render(){
    document.querySelector('.container').innerHTML = menu_array
}

render()


