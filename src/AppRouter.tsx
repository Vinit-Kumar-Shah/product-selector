import { Routes, Route } from "react-router-dom";
import ProductSelector from "./components/common/ProductSelector";

const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<ProductSelector />} />
      </Routes>
    </>
  );
};

export default AppRouter;
