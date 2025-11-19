import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({ isOpen, onClose, buttonText1, buttonText2 }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      formTitle="Sign Up"
    >
      <label htmlFor="email">Email</label>
      <input type="email" placeholder="Enter Your Email" required />
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Enter Your Password" required />
      <label htmlFor="password">Confirm Password</label>
      <input type="password" placeholder="Confirm Your Password" required />
      <label htmlFor="name">Username</label>
      <input type="text" placeholder="Enter Your Username" required />
      <label htmlFor="avatar">Profile Picture (Optional)</label>
      <input type="file" placeholder="Confirm Your Password" />
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

export default SignUpModal;
