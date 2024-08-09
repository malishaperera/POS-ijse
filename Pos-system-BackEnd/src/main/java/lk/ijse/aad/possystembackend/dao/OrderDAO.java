package lk.ijse.aad.possystembackend.dao;

import lk.ijse.aad.possystembackend.dto.OrderDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface OrderDAO {

    String saveOrder(OrderDTO order, Connection connection) throws SQLException;

    OrderDTO getOrder(String id, Connection connection) throws SQLException;

    List<OrderDTO> getAllOrders(Connection connection) throws SQLException;
}
