import React, { useState, useEffect } from "react";
import { getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { productos } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { storage, db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { async } from "@firebase/util";

function Galeria() {
  //Funciones para la subida de productos y coneccion con basé de datos
  const [load, setLoad] = useState(false);
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [newInfo, setNewInfo] = useState({
    id: "",
    title: "",
    price: "",
    url: "",
  });

  const handleDataEdit = (itemEdit) => {
    // console.log(itemEdit)
    setNewInfo(itemEdit); // se guardan los datos del producto que se va a editar
    setForm(true);
  };
  const guardado = async (itemEdit) => {
    console.log(itemEdit);
    const productDoc = doc(db, "productos", itemEdit.id);
    const editField = {
      // se actualiza el producto con los datos ingresados, primeramente preservando los datos originales
      title: itemEdit.title,
      price: parseInt(itemEdit.price),
      url: itemEdit.url,
    };
    await updateDoc(productDoc, editField);
    setLoad(true);
    setForm(false);
  };

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
    // Aviso de producto eliminado
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
      //console.log("flags");
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
        {/*Galeria conectada con basé de datos*/}
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
                    <>
                      <button
                        onClick={() => removeItem(val)}
                        className="input-delete"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleDataEdit(val)}
                        className="input-edit"
                      >
                        Editar
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        {form && (
          <div className="editor">
            <form>
              <input
                value={newInfo.title}
                type="text"
                placeholder="Ingresa el titulo"
                required
                id="title"
                autoComplete="off"
                onChange={(e) =>
                  setNewInfo({ ...newInfo, title: e.target.value })
                }
              />
              <input
                value={newInfo.price}
                type="number"
                placeholder="Ingresa el precio"
                required
                id="price"
                autoComplete="off"
                onChange={(e) =>
                  setNewInfo({ ...newInfo, price: e.target.value })
                }
              />
            </form>

            <button onClick={() => guardado(newInfo)}>Guardar</button>
            <button onClick={() => setForm(false)}>Cancelar</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Galeria;
