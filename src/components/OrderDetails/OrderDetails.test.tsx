import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OrderDetails from "./OrderDetails";

jest.mock("../../utils/mock", () => ({
  mockOrders: [
    {
      orders: [
        {
          uuid: "6f0945f1-6a83-4dfd-93bb-3242314196",
          id: "158924",
          status: "Pendente",
          total: 253.0,
          delivery_cost: 12.0,
          shipping_method: "Entrega Expressa",
          delivery_estimated: "2025-02-17",
          customer: {
            name: "João da Silva",
            address: "Rua das Palmeiras, 123",
          },
          items: [
            {
              imagem:
                "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              name: "Celular A",
              quantity: 1,
              price: 120.5,
            },
            {
              imagem:
                "https://images.pexels.com/photos/8947493/pexels-photo-8947493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              name: "Celular B",
              quantity: 1,
              price: 120.5,
            },
          ],
        },
      ],
    },
  ],
}));

describe("OrderDetails Component", () => {
  it("renders order details when order is found", () => {
    render(
      <MemoryRouter initialEntries={["/order/158924"]}>
        <Routes>
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Detalhes do Pedido #158924")).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Status: Pendente"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Método de Entrega: Entrega Expressa"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Data Estimada de Entrega: 16/02/2025"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Custo de Entrega: R$12.00"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Nome: João da Silva"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Endereço: Rua das Palmeiras, 123"
      )
    ).toBeInTheDocument();

    const quantityElements = screen.getAllByText(
      (_, element) => element?.textContent === "Quantidade: 1"
    );
    expect(quantityElements).toHaveLength(2);

    const priceElements = screen.getAllByText(
      (_, element) => element?.textContent === "Preço Unitário: R$120.50" && element.tagName === "P"
    );
    
    expect(priceElements).toHaveLength(2);
    
    const totalPrice = screen.getByText(
      (_, element) => element?.textContent === "Total do Pedido: R$253.00" && element.tagName === "H2"
    ); 
    
    expect(totalPrice).toBeInTheDocument();
  });

  it("renders 'Pedido não encontrado' when order is not found", () => {
    render(
      <MemoryRouter initialEntries={["/order/999"]}>
        <Routes>
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Pedido não encontrado")).toBeInTheDocument();
  });

  it("renders the back button", () => {
    render(
      <MemoryRouter initialEntries={["/order/1"]}>
        <Routes>
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: "Voltar" });
    expect(backButton).toBeInTheDocument();
  });
});
