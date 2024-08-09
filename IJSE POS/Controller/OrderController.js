import { saveOrder, getAllOrders } from '../model/OrderModel.js'; // Removed deleteOrder and updateOrder

$(document).ready(function() {
    refresh(); // Load orders when the page is loaded
    loadItemCodes(); // Load item codes
    loadCustomerIds(); // Load customer IDs

    const orderForm = document.querySelector('#OrderManage #orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    } else {
        console.error('Order form not found!');
    }

    // Event listener for customer ID selection
    $('#OrderManage .itemCodeSelect').change(function() {
        const selectedItemId = $(this).val();
        if (selectedItemId) {
            fetchItemDetails(selectedItemId);
        }
    });
});

$('#OrderManage .custIdSelect').change(function() {
    const selectedCustId = $(this).val();
    if (selectedCustId) {
        fetchCustomerDetails(selectedCustId);
    }
});


function fetchItemDetails(itemId) {
    if (itemData[itemId]) { // Check if item data is available
        let item = itemData[itemId];
        console.log('Item:', item); // Log item data

        // Populate form fields with item data
        $('#OrderManage .itemName').val(item.itemName || ''); // Fill item name
        $('#OrderManage .itemPrice').val(item.itemPrice || ''); // Fill item price
        $('#OrderManage .itemQty').val(item.itemQty || ''); // Fill item quantity
    } else {
        console.error('Item not found:', itemId);
    }
}



function fetchCustomerDetails(custId) {
    if (customerData[custId]) { // Check if customer data is available
        let customer = customerData[custId];
        console.log('Customer:', customer); // Log customer data
        // Populate form fields with customer data
        $('#OrderManage .custName').val(customer.name || ''); // Fill customer name
        $('#OrderManage .custSalary').val(customer.salary || ''); // Fill customer salary
        $('#OrderManage .custAddress').val(customer.address || ''); // Fill customer address
    } else {
        console.error('Customer not found:', custId);
    }
}

$('#OrderManage .placeOrder').click(function() {
    const order = {
        orderId: $('#OrderManage .orderId').val(),
        orderDate: $('#OrderManage .orderDate').val(),
        custId: $('#OrderManage .custIdSelect').val(), // Updated to use dropdown selection
        items: getOrderItems(),
        total: parseFloat($('#OrderManage .total').text()),
        discount: parseFloat($('#OrderManage .discount').val()),
        subTotal: parseFloat($('#OrderManage .subTotal').text()),
        cash: parseFloat($('#OrderManage .cash').val()),
        balance: parseFloat($('#OrderManage .balance').val())
    };

    if (validateOrder(order)) {
        saveOrder(order); // Save the order locally
        sendRequest('POST', 'http://localhost:8080/Pos_system_BackEnd/order', order, function(response) {
            alert('Order Placed');
            updateItemData();
            refresh(); 
        });
    }
});

// Removed deleteOrder and updateOrder related code

function refresh() {
    $('#OrderManage .orderId').val(createOrderId());
    $('#OrderManage .orderDate').val('');
    $('#OrderManage .custIdSelect').val(''); // Reset dropdown
    $('#OrderManage .items').val('');
    $('#OrderManage .total').text('');
    $('#OrderManage .discount').val('');
    $('#OrderManage .subTotal').text('');
    $('#OrderManage .cash').val('');
    $('#OrderManage .balance').val('');
    // Clear validation messages
    $('#OrderManage .invalidOrderId').text('');
    $('#OrderManage .invalidOrderDate').text('');
    $('#OrderManage .invalidCustId').text('');
    $('#OrderManage .invalidItems').text('');
    $('#OrderManage .invalidTotal').text('');
    $('#OrderManage .invalidDiscount').text('');
    $('#OrderManage .invalidSubTotal').text('');
    $('#OrderManage .invalidCash').text('');
    $('#OrderManage .invalidBalance').text('');

    sendRequest('GET', 'http://localhost:8080/Pos_system_BackEnd/order', null, function(response) {
        try {
            let orders = JSON.parse(response);
            loadOrderTable(orders);
        } catch (e) {
            console.error("Error parsing JSON response: ", e);
        }
    });
}

function sendRequest(method, url, data, callback) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            console.log(`Response received from ${url}: ${http.responseText}`);
            if (http.status >= 200 && http.status < 300) {
                callback(http.responseText);
            } else {
                console.error(`Operation Failed: ${http.status} ${http.statusText}`);
                alert(`Operation Failed: ${http.status} ${http.statusText}\nResponse Text: ${http.responseText}`);
            }
        }
    };

    http.open(method, url, true);
    if (method === 'POST' || method === 'PUT') {
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(data));
    } else {
        http.send();
    }
}

function validateOrder(order) {
    let valid = true;

    if (/^O[0-9]+$/.test(order.orderId)) {
        $('#OrderManage .invalidOrderId').text('');
    } else {
        $('#OrderManage .invalidOrderId').text('Invalid Order Id');
        valid = false;
    }

    if (order.orderDate) {
        $('#OrderManage .invalidOrderDate').text('');
    } else {
        $('#OrderManage .invalidOrderDate').text('Invalid Order Date');
        valid = false;
    }

    if (/^C0[0-9]+$/.test(order.custId)) {
        $('#OrderManage .invalidCustId').text('');
    } else {
        $('#OrderManage .invalidCustId').text('Invalid Customer Id');
        valid = false;
    }

    if (order.items && order.items.length > 0) {
        $('#OrderManage .invalidItems').text('');
    } else {
        $('#OrderManage .invalidItems').text('Invalid Items');
        valid = false;
    }

    if (order.total && order.total > 0) {
        $('#OrderManage .invalidTotal').text('');
    } else {
        $('#OrderManage .invalidTotal').text('Invalid Total');
        valid = false;
    }

    if (order.discount >= 0 && order.discount <= 100) {
        $('#OrderManage .invalidDiscount').text('');
    } else {
        $('#OrderManage .invalidDiscount').text('Invalid Discount');
        valid = false;
    }

    if (order.subTotal && order.subTotal > 0) {
        $('#OrderManage .invalidSubTotal').text('');
    } else {
        $('#OrderManage .invalidSubTotal').text('Invalid SubTotal');
        valid = false;
    }

    if (order.cash && order.cash >= order.subTotal) {
        $('#OrderManage .invalidCash').text('');
    } else {
        $('#OrderManage .invalidCash').text('Invalid Cash');
        valid = false;
    }

    if (order.balance != null) {
        $('#OrderManage .invalidBalance').text('');
    } else {
        $('#OrderManage .invalidBalance').text('Invalid Balance');
        valid = false;
    }

    return valid;
}

function getOrderItems() {
    // Implement this function to retrieve items from the order form
   
    return [
        {
            itemId: $('#OrderManage .itemCodeSelect').val(),
            itemName: $('#OrderManage .itemCodeSelect option:selected').text(),
            itemQty: parseInt($('#OrderManage .itemQty').val()),
            itemPrice: parseFloat($('#OrderManage .itemPrice').val())
        },
        // Add more items here as needed
    ];
}

function updateItemData() {
    let items = getOrderItems();
    for (let i = 0; i < items.length; i++) {
        let item = {
            itemId: items[i].itemId,
            itemName: items[i].itemName,
            itemQty: items[i].itemQty,
            itemPrice: items[i].itemPrice
        };
        
        // POST request to update item quantity
        sendRequest('PUT', `http://localhost:8080/Pos_system_BackEnd/item/${item.itemId}`, item, function(response) {
            console.log('Item updated:', response);
        });
    }
}

function createOrderId() {
    let orders = getAllOrders();

    if (!orders || orders.length === 0) {
        return 'O01';
    } else {
        let lastOrder = orders[orders.length - 1];
        let id = lastOrder && lastOrder.orderId ? lastOrder.orderId : 'O00';

        let number = extractNumber(id);
        number++;
        let newId = 'O' + number;
        console.log("Generated Order ID: ", newId);
        return newId;
    }
}

function extractNumber(id) {
    var match = id.match(/O(\d+)/);
    if (match && match.length > 1) {
        return parseInt(match[1]);
    }
    return null;
}

function loadOrderTable(orders) {
    $('#OrderManage .tableRow').empty();
    orders.forEach(order => {
        $('#OrderManage .tableRow').append(
            `<tr>
                <td>${order.orderId}</td>
                <td>${order.orderDate}</td>
                <td>${order.custId}</td>
                <td>${order.total}</td>
                <td>${order.discount}</td>
                <td>${order.subTotal}</td>
                <td>${order.cash}</td>
                <td>${order.balance}</td>
            </tr>`
        );
    });
}

let itemData = {};
function loadItemCodes() {
    sendRequest('GET', 'http://localhost:8080/Pos_system_BackEnd/item', null, function(response) {
        console.log('Item Codes Response:', response); 
        try {
            let items = JSON.parse(response);
            console.log('Parsed Items:', items); // Log parsed data
            let itemSelect = $('#OrderManage .itemCodeSelect');

            itemData = {};
            let customerSelect = $('#OrderManage .itemCodeSelect');
            itemSelect.empty(); // Clear existing options




            items.forEach(item => {
                if (item.itemId && item.itemName) {
                    itemData[item.itemId] = item;
                    itemSelect.append(`<option value="${item.itemId}">${item.itemId}</option>`);
                    console.log("Item ID and Name: " + item.itemId + " " + item.itemName);
                }
            });

           
        } catch (e) {
            console.error("Error parsing JSON response for items: ", e);
        }
    });
}


let customerData = {}; // Global object to store customer data

function loadCustomerIds() {
    sendRequest('GET', 'http://localhost:8080/Pos_system_BackEnd/customer', null, function(response) {
        console.log('Customer IDs Response:', response); // Log raw response
        try {
            let customers = JSON.parse(response);
            console.log('Parsed Customers:', customers); // Log parsed data

            customerData = {}; // Clear previous data
            let customerSelect = $('#OrderManage .custIdSelect');
            customerSelect.empty(); // Clear existing options

            customers.forEach(customer => {
                if (customer.id && customer.name) { // Ensure id and name exist
                    customerData[customer.id] = customer; // Store customer data
                    customerSelect.append(`<option value="${customer.id}">${customer.id}</option>`);
                    console.log("Customer ID and Name: " + customer.id + " " + customer.name);
                }
            });
        } catch (e) {
            console.error("Error parsing JSON response for customers: ", e);
        }
    });
}