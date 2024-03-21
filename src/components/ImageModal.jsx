function ImageModal({ src, toggleModal }) {
  const hideModal = (e) => {
    if (e.target.id === 'imageModal') {
      toggleModal(false);
      return;
    }
  };
  return (
    <>
      <div
        id="imageModal"
        className="open-modal w-full h-full fixed top-0 left-0 z-50 bg-slate-800 bg-opacity-40 flex items-center justify-center backdrop-box"
        onClick={hideModal}
      >
        <img
          src={src}
          alt=""
          className="w-11/12 lg:w-9/12 xl:w-2/4 rounded-lg"
        />
      </div>
    </>
  );
}

export default ImageModal;
