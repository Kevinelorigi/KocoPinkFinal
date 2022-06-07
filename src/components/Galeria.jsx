import React, { useState, useEffect } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { productos } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { storage, db } from "../firebase";
import toast, { Toaster } from 'react-hot-toast';

function Galeria() {
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  };
  const removeItem = async (item) => {
    const imgRef = ref(storage, item.url);

    await deleteObject(imgRef)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await deleteDoc(doc(db, "productos", item.id))
      .then(() => {
        toast.success("¡Producto eliminado!");
      })
      .catch(() => {
        toast.error("Error al eliminar el producto");
      });
    setLoad(true);
  };
  useEffect(() => {
    const getProducts = async () => {
      if (load) {
        setLoad(false);
      }
      console.log("flags");
      const data = await getDocs(productos);
      setProduct(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    };
    getProducts();
  }, [load]);

  return (
    <div className="galery">
      <Toaster />
      <div className="title-galery">
        <h1 className="galery-t">GALERIA</h1>
      </div>
      {loading && (
        <div className="center">
          <div className="ring"></div>
          <span className="cargando">Cargando...</span>
        </div>
      )}
      <section className="display-galery">
        {product &&
          product.map((val, id) => {
            return (
              <div key={id + val.id} className="box-galery">
                <div className="image-galery">
                  <img src={val.url} alt="Hola Mundo" />
                </div>
                <div className="info-galery">
                  <div className="text-galery">{val.title}</div>
                  <div className="precio-galery">{formatPrice(val.price)}</div>
                  {localStorage.getItem("rol") === "Admin" ? (
                    <button
                      onClick={() => removeItem(val)}
                      className="input-delete"
                    >
                      Eliminar
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Galeria;
