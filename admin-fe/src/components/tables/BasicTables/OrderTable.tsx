import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";

import {
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../../../services/order.service";

type Product = {
  productId: string;

  name: string;

  image: string;

  price: number;

  quantity: number;
};

type Order = {
  id: string;

  customerId: string;

  total: number;

  status: string;

  createdAt: Date;

  products: Product[];
};

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);

  const [status, setStatus] = useState("Pending");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getOrders();

      console.log(response);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openEdit = (order: Order) => {
    setSelectedOrder(order);

    setStatus(order.status);

    setIsOpen(true);
  };

  const openDetail = async (order: Order) => {
    try {
      const detail = await getOrderById(order.id);

      setSelectedOrder(detail);

      setDetailOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (!selectedOrder) return;

    try {
      await updateOrderStatus(selectedOrder.id, status);

      await loadOrders();

      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-gray-900
        "
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader className="text-center">
                Order ID
              </TableCell>

              <TableCell isHeader className="text-center">
                Customer
              </TableCell>

              <TableCell isHeader className="text-center">
                Total
              </TableCell>

              <TableCell isHeader className="text-center">
                Status
              </TableCell>

              <TableCell isHeader className="text-center">
                Date
              </TableCell>

              <TableCell isHeader className="text-center">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell
                  className="
                    text-center
                    font-medium
                    "
                >
                  {order.id}
                </TableCell>

                <TableCell
                  className="
                    text-center
                    "
                >
                  {order.customerId}
                </TableCell>

                <TableCell
                  className="
                    text-center
                    font-medium
                    text-green-600
                    "
                >
                  {order.total.toLocaleString()}đ
                </TableCell>

                <TableCell
                  className="
                    text-center
                    "
                >
                  <div
                    className="
                      flex
                      justify-center
                      "
                  >
                    <Badge
                      size="sm"
                      color={
                        order.status === "Completed"
                          ? "success"
                          : order.status === "Pending"
                            ? "warning"
                            : order.status === "Shipping"
                              ? "info"
                              : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </TableCell>

                <TableCell
                  className="
                    text-center
                    "
                >
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div
                    className="
                      flex
                      justify-center
                      gap-2
                      "
                  >
                    <Button
                      size="sm"
                      className="
                        w-[80px]
                        "
                      onClick={() => openEdit(order)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="
                        w-[80px]
                        "
                      onClick={() => openDetail(order)}
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="
        max-w-[400px]
        "
      >
        <div className="p-6">
          <h4
            className="
            mb-5
            text-xl
            font-semibold
            "
          >
            Edit Order Status
          </h4>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
            w-full
            rounded-lg
            border
            p-3
            "
          >
            <option>Pending</option>

            <option>Shipping</option>

            <option>Completed</option>

            <option>Cancelled</option>
          </select>

          <div
            className="
            mt-6
            flex
            justify-end
            gap-3
            "
          >
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        className="
        max-w-[700px]
        "
      >
        {selectedOrder && (
          <div className="p-6">
            <h4
              className="
              mb-6
              text-xl
              font-semibold
              "
            >
              Order Detail
            </h4>

            <div
              className="
              space-y-4
              "
            >
              <div>
                <b>Order ID:</b> {selectedOrder.id}
              </div>

              <div>
                <b>Customer:</b> {selectedOrder.customerId}
              </div>

              <div>
                <b>Status:</b> {selectedOrder.status}
              </div>

              <div>
                <b>Products</b>
              </div>

              <div
                className="
                rounded-lg
                border
                "
              >
                {selectedOrder.products.map((product) => (
                  <div
                    key={product.productId}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      p-4
                      last:border-none
                      "
                  >
                    <div>{product.name}</div>

                    <div>x{product.quantity}</div>

                    <div>{product.price.toLocaleString()}đ</div>
                  </div>
                ))}
              </div>

              <div
                className="
                text-right
                text-lg
                font-semibold
                text-green-600
                "
              >
                Total: {selectedOrder.total.toLocaleString()}đ
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
