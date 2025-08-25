import React, { useState } from "react";

const SingleProduct = () => {
  // Product data
  const product = {
    id: 1,
    title: "3D Box Modeling",
    price: "154,00 ",
    description:
      "Master the art of 3D box modeling with this comprehensive guide. Perfect for beginners and intermediate designers looking to enhance their skills.",
    features: [
      "Step-by-step tutorials",
      "Real-world projects",
      "Printable templates",
      "Access to online community",
      "Downloadable resources",
    ],
    image: "productbook-1.jpg",
    author: "Jane Doe",
    pages: "240",
    format: "Paperback",
    published: "2023",
  };

  // State for quantity and hover effects
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

  // Style object
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    productContainer: {
      display: "flex",
      gap: "3rem",
      marginBottom: "3rem",
      "@media (max-width: 768px)": {
        flexDirection: "column",
      },
    },
    imageSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    mainImageContainer: {
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      padding: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "400px",
      overflow: "hidden",
    },
    mainImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      transition: "transform 0.3s ease",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
    },
    thumbnailContainer: {
      display: "flex",
      gap: "1rem",
      overflowX: "auto",
      padding: "0.5rem 0",
    },
    thumbnail: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "4px",
      cursor: "pointer",
      border: "2px solid #ddd",
      transition: "border-color 0.2s ease",
      ":hover": {
        borderColor: "#3498db",
      },
    },
    detailsSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      color: "#2c3e50",
    },
    price: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#e74c3c",
      marginBottom: "1rem",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1rem",
      color: "#7f8c8d",
    },
    description: {
      lineHeight: "1.6",
      marginBottom: "1.5rem",
      color: "#555",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    metaItem: {
      display: "flex",
      flexDirection: "column",
    },
    metaLabel: {
      fontSize: "0.875rem",
      color: "#7f8c8d",
      marginBottom: "0.25rem",
    },
    metaValue: {
      fontSize: "1rem",
      fontWeight: "500",
    },
    featuresTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#2c3e50",
    },
    featuresList: {
      listStyle: "none",
      padding: 0,
      marginBottom: "2rem",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 0",
      ":before": {
        content: '"✓"',
        color: "#3498db",
      },
    },
    quantityContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    quantityButton: {
      width: "40px",
      height: "40px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      background: "none",
      fontSize: "1.25rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    quantityInput: {
      width: "60px",
      height: "40px",
      textAlign: "center",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    actionButtons: {
      display: "flex",
      gap: "1rem",
      marginTop: "auto",
    },
    primaryButton: {
      flex: 1,
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.2s ease",
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: "transparent",
      color: "#3498db",
      border: "2px solid #3498db",
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.productContainer}>
        {/* Image Section - LEFT SIDE */}
        <div style={styles.imageSection}>
          <div
            style={styles.mainImageContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={`/images/${activeImage}`}
              alt={product.title}
              style={styles.mainImage}
              onError={(e) => {
                e.target.src = "/images/default-product.jpg";
                e.target.alt = "Default product image";
              }}
            />
          </div>
          <div style={styles.thumbnailContainer}>
            <img
              src={`/images/${product.image}`}
              alt="Thumbnail 1"
              style={{
                ...styles.thumbnail,
                borderColor: activeImage === product.image ? "#3498db" : "#ddd",
              }}
              onClick={() => setActiveImage(product.image)}
            />
          </div>
        </div>

        {/* Details Section - RIGHT SIDE */}
        <div style={styles.detailsSection}>
          <h1 style={styles.title}>{product.title}</h1>
          <div style={styles.price}>{product.price}</div>

          <p style={styles.description}>{product.description}</p>

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Author</span>
              <span style={styles.metaValue}>{product.author}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Pages</span>
              <span style={styles.metaValue}>{product.pages}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Format</span>
              <span style={styles.metaValue}>{product.format}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Published</span>
              <span style={styles.metaValue}>{product.published}</span>
            </div>
          </div>

          <h2 style={styles.featuresTitle}>Key Features</h2>
          <ul style={styles.featuresList}>
            {product.features.map((feature, index) => (
              <li key={index} style={styles.featureItem}>
                {feature}
              </li>
            ))}
          </ul>

          <div style={styles.quantityContainer}>
            <label htmlFor="quantity">Quantity:</label>
            <button
              style={styles.quantityButton}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              style={styles.quantityInput}
            />
            <button
              style={styles.quantityButton}
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <div style={styles.actionButtons}>
            <button
              style={styles.primaryButton}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#2980b9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#3498db")
              }
            >
              Add to Cart
            </button>
            <button
              style={styles.secondaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f8ff";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
