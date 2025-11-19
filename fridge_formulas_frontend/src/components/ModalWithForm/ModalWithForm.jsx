import "./ModalWithForm.css";
function ModalWithForm({
  isOpen,
  formTitle,
  onClose,
  onSubmit,
  children
}) {
 
  if (!isOpen) return null;

  return (
    <div className="modal__backdrop">
      <div className="modal modal_opened">
        <button className="modal__close-button" onClick={onClose}>
          Close
        </button>
        <h2>{formTitle}</h2>
        <form className="modal__form"onSubmit={onSubmit}>
         {children}
         </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
