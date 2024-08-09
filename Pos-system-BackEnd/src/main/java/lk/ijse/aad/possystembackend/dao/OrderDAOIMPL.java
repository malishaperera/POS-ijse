package lk.ijse.aad.possystembackend.dao;

import lk.ijse.aad.possystembackend.dto.OrderDTO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAOIMPL implements OrderDAO{

    private static final String SAVE_ORDER = "INSERT INTO orders (orderId, orderDate, id, itemId, itemPrice, orderQty) VALUES (?, ?, ?, ?, ?, ?)";
    private static final String GET_ORDER = "SELECT * FROM orders WHERE orderId=?";
    private static final String GET_ALL_ORDERS = "SELECT * FROM orders";
    @Override
    public String saveOrder(OrderDTO order, Connection connection) throws SQLException {
        try (PreparedStatement ps = connection.prepareStatement(SAVE_ORDER)) {
            ps.setString(1, order.getOrderId());
            ps.setDate(2, (Date) order.getOrderDate());
            ps.setString(3, order.getOrderId());
            ps.setString(4, order.getItemId());
            ps.setInt(5, order.getItemPrice());
            ps.setInt(6, order.getOrderQty());

            if (ps.executeUpdate() != 0) {
                return "Order Saved Successfully";
            } else {
                return "Failed to Save Order";
            }
        }
    }

    @Override
    public OrderDTO getOrder(String id, Connection connection) throws SQLException {
        try (PreparedStatement ps = connection.prepareStatement(GET_ORDER)) {
            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    OrderDTO order = new OrderDTO();
                    order.setOrderId(rs.getString("orderId"));
                    order.setOrderDate(rs.getDate("orderDate")); // Retrieves java.sql.Date from ResultSet
                    order.setCustomerId(rs.getString("customerId"));
                    order.setItemId(rs.getString("itemId"));
                    order.setItemPrice(rs.getInt("itemPrice"));
                    order.setOrderQty(rs.getInt("orderQty"));
                    return order;
                }
            }
        }
        return null;
    }

    @Override
    public List<OrderDTO> getAllOrders(Connection connection) throws SQLException {
        List<OrderDTO> orders = new ArrayList<>();
        try (PreparedStatement ps = connection.prepareStatement(GET_ALL_ORDERS);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                OrderDTO order = new OrderDTO();
                order.setOrderId(rs.getString("orderId"));
                order.setOrderDate(rs.getDate("orderDate")); // Retrieves java.sql.Date from ResultSet
                order.setCustomerId(rs.getString("customerId"));
                order.setItemId(rs.getString("itemId"));
                order.setItemPrice(rs.getInt("itemPrice"));
                order.setOrderQty(rs.getInt("orderQty"));
                orders.add(order);
            }
        }
        return orders;
    }
}
