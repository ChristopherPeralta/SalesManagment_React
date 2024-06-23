import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "../pages/Category/Category";
import Brand from "../pages/Brand/Brand";

export function MyRoutes() {
  return (
     
    <Routes>
      <Route path="/categorias" element={<Category />} />
      <Route path="/marcas" element={<Brand />} />
    </Routes>
    
  );
}