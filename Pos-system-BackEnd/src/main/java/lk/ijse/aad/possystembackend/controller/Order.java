package lk.ijse.aad.possystembackend.controller;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.aad.possystembackend.bo.OrderBOIMPL;
import lk.ijse.aad.possystembackend.dto.OrderDTO;
import org.slf4j.LoggerFactory;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = "/order", loadOnStartup = 3)
public class Order extends HttpServlet {
    static org.slf4j.Logger logger = LoggerFactory.getLogger(Order.class.getName());
    Connection connection;

    @Override
    public void init() throws ServletException {
        logger.info("Init method invoked");
        try {
            var ctx = new InitialContext();
            DataSource pool = (DataSource) ctx.lookup("java:comp/env/jdbc/PosSystem");
            this.connection = pool.getConnection();
            logger.info("Connection initialized");
        } catch (SQLException | NamingException e) {
            e.printStackTrace();
        }
    }



    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null || !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try (var writer = resp.getWriter()) {
            Jsonb jsonb = JsonbBuilder.create();
            OrderDTO order = jsonb.fromJson(req.getReader(), OrderDTO.class);

            logger.info("Received Order: " + order);

            var orderBOIMPL = new OrderBOIMPL();
            String result = orderBOIMPL.saveOrder(order, connection);

            writer.write(result);
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }



    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<OrderDTO> orders = new ArrayList<>();
        try {
            var orderBOIMPL = new OrderBOIMPL();
            if (req.getParameter("id") == null) {
                orders = orderBOIMPL.getAllOrders(connection);
            } else {
                OrderDTO order = orderBOIMPL.getOrder(req.getParameter("id"), connection);
                if (order != null) {
                    orders.add(order);
                }
            }
            Jsonb jsonb = JsonbBuilder.create();
            resp.setContentType("application/json");
            resp.getWriter().write(jsonb.toJson(orders));
            resp.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }





}
