import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "../pages/Category/Category";
import Brand from "../pages/Brand/Brand";
import Product from "../pages/Product/Product";
import Purchase from '../pages/Purchase/Purchase';
import FormPurchase from '../pages/Purchase/FormPurchase';
import Sale from '../pages/Sale/Sale';
import FormSale from '../pages/Sale/FormSale';

export function MyRoutes() {
  return (
     
    <Routes>
      <Route path="/categorias" element={<Category />} />
      <Route path="/marcas" element={<Brand />} />
      <Route path="/productos" element={<Product />} />
      <Route path="/compras" element={<Purchase />} />
      <Route path="/compra" element={<FormPurchase/>} />
      <Route path="/ventas" element={<Sale />} />
      <Route path="/venta" element={<FormSale />} />
    </Routes>
    
  );
}