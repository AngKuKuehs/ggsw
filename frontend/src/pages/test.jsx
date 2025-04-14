import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import ProductCard from "../components/ProductCard.jsx"; 

const TestPage = () => {
  const sampleProduct = {
    name: "Organic Avocado",
    price: "4.99",
    rating: 5,
    image:
      "https://i5.walmartimages.com/seo/Fresh-Produce-Tropical-Avocado-Each_447c8d99-28ba-428b-af97-ec514ae263e3_1.0928ed0270b508fa08c84c3d9efe4f8e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  };

  return (
    <>
      <Header />

      {/* Page Content */}
      <main className="min-h-screen px-6 py-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-6">Test Product</h2>

        <div className="max-w-md mx-auto">
          <ProductCard {...sampleProduct} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TestPage;