import { Orders } from "../db/DB.js";

let orders = [...Orders, ...getAllOrders()];

export function saveOrder(order) {
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getAllOrders() {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
}
