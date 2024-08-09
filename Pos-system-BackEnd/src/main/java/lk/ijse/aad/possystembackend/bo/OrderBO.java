package lk.ijse.aad.possystembackend.bo;

import lk.ijse.aad.possystembackend.dto.OrderDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface OrderBO {
    String saveOrder(OrderDTO order, Connection connection) throws Exception;

    OrderDTO getOrder(String id, Connection connection) throws Exception;

    List<OrderDTO> getAllOrders(Connection connection) throws SQLException;
}
