import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Upload from "./components/Upload";

import Chat from "./components/Chat";

function App() {

  const [documents, setDocuments] = useState([]);

  const [activeDoc, setActiveDoc] =
    useState(null);

  const handleUpload = (fileName) => {

    setDocuments((prev) => [
      ...prev,
      fileName
    ]);

    setActiveDoc(fileName);
  };

  return (
    <div className="app-layout">

      <Sidebar
        documents={documents}
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
      />

      <div className="main-content">

        <h1>
          RAG AI Assistant
        </h1>

        <Upload
          onUpload={handleUpload}
        />

        <Chat
          activeDoc={activeDoc}
        />

      </div>

    </div>
  );
}

export default App;