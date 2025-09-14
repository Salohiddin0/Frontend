export default async function handler(req, res) {
  const baseUrl = 'https://fakestoreapi.com/products'

  if (req.method === 'GET') {
    const r = await fetch(baseUrl)
    const data = await r.json()
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const r = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    const data = await r.json()
    return res.status(200).json(data)
  }

  res.status(405).json({ message: 'Method not allowed' })
}
