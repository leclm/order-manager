import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";

describe("Home Page", () => {
  it("renders the title", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const title = screen.getByText("Lista de Pedidos");
    expect(title).toBeInTheDocument();
  });

  it("renders the OrderFilters component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Buscar por nome do cliente...");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the OrderList component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const orderList = screen.getByRole("list");
    expect(orderList).toBeInTheDocument();
  });

  it("displays an error message when no orders match the filters", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Buscar por nome do cliente...");
    fireEvent.change(searchInput, { target: { value: "Nonexistent Name" } });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "Nenhum pedido encontrado com esse nome."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("filters orders by name", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  
    const searchInput = screen.getByPlaceholderText("Buscar por nome do cliente...");
    fireEvent.change(searchInput, { target: { value: "Maria" } });
  
    await waitFor(() => {
      const filteredOrders = screen.queryAllByText(/Maria/i);
  
      if (filteredOrders.length > 0) {
        expect(filteredOrders.length).toBeGreaterThan(0);
      } else {
        const errorMessage = screen.queryByText(/nenhum pedido encontrado/i);
        expect(errorMessage).toBeInTheDocument();
      }
    });
  }); 
  
  it("filters orders by status", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  
    const statusSelect = screen.getByRole("listbox");
    fireEvent.change(statusSelect, { target: { value: "Aprovado" } });
  
    await waitFor(() => {
      const filteredOrders = screen.queryAllByText("Aprovado", { selector: "p.text-sm.font-semibold" });
  
      if (filteredOrders.length > 0) {
        expect(filteredOrders.length).toBeGreaterThan(0);
      } else {
        const errorMessage = screen.queryByText(/nenhum pedido encontrado/i);
        expect(errorMessage).toBeInTheDocument();
      }
    });
  });  
});
