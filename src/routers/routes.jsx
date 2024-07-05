import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "../pages/Category/Category";
import Brand from "../pages/Brand/Brand";
import Product from "../pages/Product/Product";
import Purchase from '../pages/Purchase/Purchase';

export function MyRoutes() {
  return (
     
    <Routes>
      <Route path="/categorias" element={<Category />} />
      <Route path="/marcas" element={<Brand />} />
      <Route path="/productos" element={<Product />} />
      <Route path="/compras" element={<Purchase />} />
    </Routes>
    
  );
}