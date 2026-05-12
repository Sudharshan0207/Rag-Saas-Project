import { uploadFile } from "../services/api";

function Upload({ onUpload }) {

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const response =
        await uploadFile(file);

      console.log(response.data);

      if (onUpload) {

        onUpload(file.name);

      }

      alert(
        "PDF uploaded successfully!"
      );

    } catch (err) {

      console.log(err);

      alert("Upload failed");

    }
  };

  return (
    <div className="upload-box">

      <input
        type="file"
        onChange={handleUpload}
      />

    </div>
  );
}

export default Upload;