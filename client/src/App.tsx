import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <h3>POSAdvanced</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} ({product.category}), wariantów: {product.variants.length}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App