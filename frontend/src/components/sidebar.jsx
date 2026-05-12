function Sidebar({

  documents,
  activeDoc,
  setActiveDoc

}) {

  return (
    <div className="sidebar">

      <h2>Documents</h2>

      {
        documents.length === 0 ? (

          <p>No PDFs uploaded</p>

        ) : (

          documents.map((doc, index) => (

            <div
              key={index}

              className={
                activeDoc === doc
                  ? "sidebar-item active-doc"
                  : "sidebar-item"
              }

              onClick={() =>
                setActiveDoc(doc)
              }
            >

              {doc}

            </div>

          ))
        )
      }

    </div>
  );
}

export default Sidebar;