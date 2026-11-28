import { createBrowserRouter } from 'react-router'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import ComingSoon from '../shared/components/ComingSoon'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'
import ProductDetail from '../../features/products/details/ProductDetail'
import ProductFormPage from '../../features/products/form/ProductFormPage'
import ReceiptList from '../../features/receipts/list/ReceiptList'
import ReceiptForm from '../../features/receipts/form/ReceiptForm'
import ReceiptDetails from '../../features/receipts/details/ReceiptDetails'

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
      { path: 'receipts', element: <ReceiptList /> },
      { path: 'receipts/new', element: <ReceiptForm /> },
      { path: 'receipts/:id', element: <ReceiptDetails /> },
      { path: 'sales', element: <ComingSoon title="Sprzedaż" /> }
    ]
  }
])