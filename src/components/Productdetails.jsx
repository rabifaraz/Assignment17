import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Productdetails = () => {
  const { id } = useParams();
  const [singleproduct, setsingleproduct] = useState("");

  // console.log(id);

  useEffect(() => {
    const fetchSingleData = axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setsingleproduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(singleproduct);

  return (
    <>
      <div className="container">
        <Link to="/">
          <button className="btn">← Back to Store</button>
        </Link>

        {singleproduct ? (
          <div>
            <div className="single-book">
              <div className="book-cover">
                <img src={singleproduct.image} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{singleproduct.title}</h3>
                <p>{singleproduct.description}</p>
                <h3 className="erase-book">$ {singleproduct.price}</h3>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              Product not found. Click the button above to go back to the list
              of products.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Productdetails;
