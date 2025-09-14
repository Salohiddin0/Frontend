import { useEffect, useState } from 'react'

export default function Home () {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products') 
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Xato (GET):', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products (API’dan)</h1>
      {loading && <p>Loading...</p>}

      {products.length === 0 ? (
        <p>Mahsulot topilmadi</p>
      ) : (
        <table
          border='1'
          cellPadding='8'
          style={{ borderCollapse: 'collapse', width: '100%' }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>
                  {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
