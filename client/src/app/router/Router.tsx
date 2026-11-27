import { createBrowserRouter } from 'react-router'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import ComingSoon from '../shared/components/ComingSoon'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'
import ProductDetail from '../../features/products/details/ProductDetail'
import ProductFormPage from '../../features/products/form/ProductFormPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'products', element: <ProductDashboard /> },
      { path: 'products/new', element: <ProductFormPage /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'products/:id/edit', element: <ProductFormPage /> },
      { path: 'warehouse', element: <ComingSoon title="Magazyn" /> },
      { path: 'sales', element: <ComingSoon title="Sprzedaż" /> }
    ]
  }
])