import React from "react";

function ProductsSection() {
  // Product data
  const products = [
    {
      id: 1,
      title: "3D Box Modeling",
      price: "154,00 $",
      image: "productbook-1.jpg",
    },
    {
      id: 2,
      title: "Intelligent Business",
      price: "499,00 $",
      image: "productbook-2.jpg",
    },
    {
      id: 3,
      title: "Market Leader",
      price: "459,00 $",
      image: "productbook-3.jpg",
    },
  ];

  // Styles object
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "0 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "28px",
      color: "#2c3e50",
      marginBottom: "30px",
      fontWeight: "600",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
    },
    productCard: {
      background: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    productCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    },
    imageContainer: {
      height: "250px", // Increased height for better image display
      overflow: "hidden",
      position: "relative",
      backgroundColor: "#f8f9fa", // Fallback background
    },
    productImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain", // Changed from 'cover' to 'contain'
      objectPosition: "center",
      transition: "transform 0.5s ease",
      padding: "20px", // Gives space around the image
      boxSizing: "border-box",
    },
    productImageHover: {
      transform: "scale(1.05)",
    },
    productInfo: {
      padding: "20px",
      textAlign: "center",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    productTitle: {
      fontSize: "20px",
      color: "#2c3e50",
      marginBottom: "10px",
      fontWeight: "600",
    },
    productPrice: {
      fontSize: "18px",
      color: "#e74c3c",
      fontWeight: "700",
      marginBottom: "15px",
    },
    addToCartBtn: {
      backgroundColor: "#e44d30",
      color: "white",
      border: "none",
      padding: "12px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      width: "100%",
      marginTop: "auto",
    },
    addToCartBtnHover: {
      backgroundColor: "#e44d30",
    },
    // Media queries
    "@media (max-width: 768px)": {
      productsGrid: {
        gridTemplateColumns: "1fr",
      },
      productCard: {
        maxWidth: "350px",
        margin: "0 auto",
      },
      imageContainer: {
        height: "200px",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Featured Products</h2>
      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.productCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                styles.productCardHover.transform;
              e.currentTarget.style.boxShadow =
                styles.productCardHover.boxShadow;
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = styles.productImageHover.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = styles.productCard.boxShadow;
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "";
            }}
          >
            <div style={styles.imageContainer}>
              <img
                src={`/images/${product.image}`}
                alt={product.title}
                style={styles.productImage}
                onError={(e) => {
                  e.target.src = "/images/default-product.jpg";
                  e.target.alt = "Default product image";
                }}
              />
            </div>
            <div style={styles.productInfo}>
              <div>
                <h3 style={styles.productTitle}>{product.title}</h3>
                <p style={styles.productPrice}>{product.price}</p>
              </div>
              <button
                style={styles.addToCartBtn}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor =
                    styles.addToCartBtnHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    styles.addToCartBtn.backgroundColor;
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsSection;
