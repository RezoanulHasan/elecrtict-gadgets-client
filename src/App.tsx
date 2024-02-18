import MainLayout from "./Component/layout/MainLayout";
import ProtectedRoute from "./Component/layout/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute role={undefined}>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
