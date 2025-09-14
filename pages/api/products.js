export default async function handler(req, res) {
  try {
    const response = await fetch("http://45.138.159.183:6061/api/Product");

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (jsonErr) {
      console.error("JSON parse error:", text.slice(0, 200)); 
      res.status(500).json({ error: "API JSON o‘rniga HTML qaytardi" });
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "API ga ulanishda xato" });
  }
}
