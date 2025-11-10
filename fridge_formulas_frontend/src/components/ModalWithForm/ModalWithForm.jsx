import "./ModalWithForm.css";
function ModalWithForm({
  isOpen,
  formTitle,
  onClose,
  onSubmit,
  buttonText1,
  buttonText2,
}) {
 
  if (!isOpen) return null;

  return (
    <div className="modal__backdrop">
      <div className="modal modal_opened">
        <button className="modal__close-button" onClick={onClose}>
          Close
        </button>
        <h2>{formTitle}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Your Email"/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Your Password"/>
        </form>
        <button type="submit" className="modal__submit-button">{buttonText1}</button>
        <button type="button" className="modal__second-button">{buttonText2}</button>
      </div>
    </div>
  );
}

export default ModalWithForm;
