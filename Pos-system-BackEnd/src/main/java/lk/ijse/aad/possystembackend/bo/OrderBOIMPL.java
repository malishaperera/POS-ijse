package lk.ijse.aad.possystembackend.bo;

import lk.ijse.aad.possystembackend.dao.OrderDAOIMPL;
import lk.ijse.aad.possystembackend.dto.OrderDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class OrderBOIMPL implements OrderBO{
    @Override
    public String saveOrder(OrderDTO order, Connection connection) throws Exception {
        var orderDAOIMPL = new OrderDAOIMPL();
        return orderDAOIMPL.saveOrder(order, connection);
    }

    @Override
    public OrderDTO getOrder(String id, Connection connection) throws Exception {
        var orderDAOIMPL = new OrderDAOIMPL();
        return orderDAOIMPL.getOrder(id, connection);
    }

    @Override
    public List<OrderDTO> getAllOrders(Connection connection) throws SQLException {
        var orderDAOIMPL = new OrderDAOIMPL();
        return orderDAOIMPL.getAllOrders(connection);
    }
}
