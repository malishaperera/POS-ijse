package lk.ijse.aad.possystembackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String orderId;
    private Date orderDate;
    private String customerId;
    private String itemId;
    private int itemPrice;
    private int orderQty;

}




