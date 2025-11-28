import "./ModalWithForm.css";
function ModalWithForm({
  isOpen,
  formTitle,
  onClose,
  onSubmit,
  children,
  isValidUser,
  setIsValidUser,
  errorMessage
}) {
  if (!isOpen) return null;

  return (
    <div className="modal__backdrop">
      <div className="modal modal_opened">
        <button
          className="modal__close-button"
          onClick={() => {
            setIsValidUser(true);
            onClose();
          }}
        >
          Close
        </button>
        <h2>{formTitle}</h2>
        {!isValidUser ? (
          <h3 className="modal__error-message">{errorMessage}</h3>
        ) : null}
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
