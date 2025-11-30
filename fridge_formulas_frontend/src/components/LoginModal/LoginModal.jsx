import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  buttonText1,
  buttonText2,
  onButtonClick,
  onOpen,
  setEmail,
  setPassword,
  isValidUser,
  setIsValidUser,
}) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      formTitle="Log In"
      isValidUser={isValidUser}
      setIsValidUser={setIsValidUser}
      errorMessage="Invalid Email or Password"
      onSubmit={(e) => {
        onButtonClick(e);
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Enter Your Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Enter Your Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="modal__buttons">
        <button type="submit" className="modal__submit-button">
          {buttonText1}
        </button>
        <button
          type="button"
          className="modal__second-button"
          onClick={() => {
            setIsValidUser(true);
            onOpen("signup-modal");
          }}
        >
          {buttonText2}
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
