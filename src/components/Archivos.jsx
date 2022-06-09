import React, { useState, useId, useRef } from "react";
import { addDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import {productos, storage} from "../firebase";
// Importaciones

function Archivos() {

  const id = useId();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const archivos = useRef();
  // Error por si no llena los campos
  const createProduct = async (e) => {
    e.preventDefault();
    if (
      title.length === 0 ||
      price.length === 0 ||
      image === null
    ) {
      toast.error("¡Debes llenar todos los campos!");

      return false;
    } else {
      console.log(title, price, image);
      await addDoc(productos, {
        title: title,
        price: parseInt(price),
        url: image,
      })
        .then(() => {
          toast.success("Producto añadido correctamente");
          setTitle("");
          setPrice("");
          setImage(null);

          archivos.current.reset();
        })
        .catch(() => {
          toast.error("Ocurrió un error...");
        });
    }
  };
  //Subir la imagen
  const uploadImage = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    // if (setImage === null) return;
    const imgRef = ref(
      storage,
      `productsImages/${Date.now() + event.target.files[0].name}`
    );
    const imgUpload = uploadBytesResumable(imgRef, event.target.files[0]);

    imgUpload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast("Subida al " + progress + "%", {
          icon: "🔼",
          duration: 1000, 
        });

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(imgUpload.snapshot.ref).then((url) => {
          console.log(`file available at ${url}`);
          setImage(url);
        });
      }
    );
  };


  return (
    <div className="arch">
      <Toaster />
      <div className="contenedores">
        <div className="forma">
          <form 
          ref={archivos}
          onSubmit={createProduct}
          >         
            <div className="input-fil">
              <input
                type="text"
                id={id}
                placeholder="Título"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-fil">
              <input
                type="number"
                placeholder="Precio"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <div className="input-imagen">
              <input type="file"
                id={id}
                accept="image/*"
                onChange={uploadImage}
                required
              /> 
            </div>
            <button type="submit" className="input-subir">
              Subir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Archivos;
