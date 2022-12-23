import React from 'react';

const PreviewImage = ({file,width,height}) => {

  const [preview, setPreview] = React.useState(null);
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
      <img src={preview} alt="Preview" width={width} height={height} />
  )

}

export default PreviewImage