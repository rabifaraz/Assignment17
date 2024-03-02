import axios from "axios";
import React, { useEffect, useState } from "react";
import MediaCard from "../components/Card";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

function BooksPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const pageTitle = "📖 Items List with Router, Redux & Firebase";

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const fetchData = await axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(products);
  const onClick_Handle = (id) => {
    navigate(`/productdetails/ ${id}`);
  };
  return (
    <div className="container">
      <Header pageTitle={pageTitle} />
      <div className="books-container">
        <div className="books-list">
          {products.map((e, i) => {
            return (
              <MediaCard
                key={i}
                image={e.image}
                title={e.title}
                desc={e.description}
                price={e.price}
                clicked={() => onClick_Handle(e.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
