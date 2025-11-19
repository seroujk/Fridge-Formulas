import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, buttonText1, buttonText2 }) {
  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} formTitle="Log In">
      <label htmlFor="email">Email</label>
      <input type="email" placeholder="Enter Your Email" />
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Enter Your Password" />
      <div className="modal__buttons">
      <button type="submit" className="modal__submit-button">
        {buttonText1}
      </button>
      <button type="button" className="modal__second-button">
        {buttonText2}
      </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
