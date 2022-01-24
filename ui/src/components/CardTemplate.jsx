import React, { useEffect, useState } from "react";

export const CardTemplate = ({ card }) => {
  const [image, setImage] = useState("");

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  useEffect(() => {
    var base64Flag = "data:image/jpeg;base64,";
    var imageStr = arrayBufferToBase64(card.image.data.data);
    setImage(base64Flag + imageStr);
  }, []);

  return (
    <div>
      <div key={card._id}>
        <h1>{card.name}</h1>
        <h1>{card.rating}</h1>
        <img
          src={`data:image/jpeg;base64,${arrayBufferToBase64(
            card.image.data.data
          )}`}
          alt={card.name}
        />
      </div>
    </div>
  );
};
