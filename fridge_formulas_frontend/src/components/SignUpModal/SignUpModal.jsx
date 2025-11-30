import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({
  isOpen,
  onClose,
  buttonText1,
  buttonText2,
  onButtonClick,
  onOpen,
  setEmail,
  setPassword,
  setUsername,
  setAvatar,
  isValidUser,
  setIsValidUser,
}) {
  let errorMessage = "error";
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      formTitle="Sign Up"
      isValidUser={isValidUser}
      setIsValidUser={setIsValidUser}
      errorMessage={errorMessage}
      onSubmit={(e) => {
        onButtonClick(e);
        onClose();
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter An Email"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Enter A Password"
        required
        pattern="^(?=.*[A-Z]).{8,}$"
        title="Must be at least 8 characters long and include one capital letter."
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="name">Username</label>
      <input
        type="text"
        placeholder="Enter A Username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="avatar">Profile Picture (Optional)</label>
      <input
        type="url"
        placeholder="Enter An Image Url"
        onChange={(e) => setAvatar(e.target.value)}
      />
      <div className="modal__buttons">
        <button type="submit" className="modal__submit-button">
          {buttonText1}
        </button>
        <button
          type="button"
          className="modal__second-button"
          onClick={() => 
           { setIsValidUser(true);
            onOpen("login-modal")}}
        >
          {buttonText2}
        </button>
      </div>
    </ModalWithForm>
  );
}

export default SignUpModal;
