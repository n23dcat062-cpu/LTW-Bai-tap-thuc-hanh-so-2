
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải sản phẩm từ API.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Danh sách sản phẩm CareBeauty</h2>

      {products.length === 0 ? (
        <p>Chưa có sản phẩm.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px"
            }}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain"
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Danh mục: {product.category}</p>
              <p><b>{Number(product.price).toLocaleString("vi-VN")} đ</b></p>
              <p>Tồn kho: {product.stock}</p>

              <button
                disabled={product.stock <= 0}
                onClick={() => onAddToCart(product)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
