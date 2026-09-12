import { menuArray } from './data.js'; // importing data

const btnEl = document.getElementById('order-btn')
const container = document.getElementById('container')
const totalEl = document.getElementById('total-price')
const payBtn = document.getElementById('pay-btn')
const myForm = document.querySelector('.payment-modal')
const completeBtn = document.getElementById('complete-btn')
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
                <button id="remove-btn" data-idx="${order_count}" >remove</button>
            </div>
            <p id="order-price">$${target_item.price}</p>
        </div>
        `
        order_count++
        update_total(target_item.price)
        orderList.push(template_html)
        document.querySelector('.order-list').innerHTML = orderList.join('')
    }
})

// removing items functionality
document.addEventListener('click', function(e){
    if(e.target.dataset.idx){ // kalo dia button remove, cari button ini index ke berapa di list orderList dari data-idx diatas, trus remove dari list dan render ulang
        orderList.forEach(function(order){
            if(order.includes(`data-idx="${e.target.dataset.idx}"`)){
                let target_idx = orderList.indexOf(order)
                let sub_amount = get_nominal_to_sub(order)
                update_total(sub_amount * -1)
                orderList.splice(target_idx,1)
                document.querySelector('.order-list').innerHTML = orderList.join('')
            }
        })
    }
})

function get_nominal_to_sub(order){
    if(order.includes('Pizza')){
        return 14
    }else{
        return 12
    }
}

function update_total(amount){
    total += amount
    totalEl.textContent = `$${total}`   
}

completeBtn.addEventListener('click', function(){
    if(orderList.length != 0){
        document.querySelector('.payment-modal').classList.remove('hidden')
    }
})

payBtn.addEventListener('click', function(e){
    e.preventDefault()
    const card_nameInput = document.getElementById('name-input')
    console.log(card_nameInput.value)

    document.querySelector('.payment-modal').classList.add('hidden')
    document.querySelector('.order-section').classList.add('hidden')

    document.querySelector('.complete-order').style.display = 'flex'
    document.querySelector('#thanks-message').textContent = `Thanks, ${card_nameInput.value}! Your order is on its way!`


    // saat pay, data nama disimpan, modal di close, orderlist juga diclose, tampilin green bar
})


function render(){
    document.querySelector('.container').innerHTML = menu_array
}

render()


