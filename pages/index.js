import { useEffect, useState } from 'react'

export default function Home () {
  const API_URL = 'http://45.138.159.183:6061/api/Product'
  const [product, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.log('Xato (GET) :', err)
    }
    setLoading(false)
  }

  const addProduct = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'New Product',
          price: 1000,
          category: 'Mevalar'
        })
      })
      const newProduct = await res.json()
      alert("Yangi mahsulot qo'shildi : " + newProduct.name)
      getProducts()
    } catch (err) {
      console.error('Xato (POST) :', err)
    }
  }

  const updateProduct = async id => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'New Product',
          price: 1000,
          category: 'Mevalar'
        })
      })
      const updated = await res.json()
      alert('Mahsulot tahrirlandi : ' + updated.name)
      getProducts()
    } catch (err) {
      console.error('Xato (PUT) :', err)
    }
  }

  const deleteProduct = async id => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      alert("Mahsulot o'chirildi")
      getProducts()
    } catch (err) {
      console.error('Xato (DELETE) :', err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {product.map(p => (
          <li key={p.id}>
            {p.name} - {p.price} so'm
            <button onClick={() => updateProduct(p.id)}>Update</button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button style={{ marginTop: '20px' }} onClick={addProduct}>
        Add New Product
      </button>
    </div>
  )
}
