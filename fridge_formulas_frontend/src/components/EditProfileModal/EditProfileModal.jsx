import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function EditProfileModal({
  isOpen,
  onClose,
  onButtonClick,
  buttonText1,
  buttonText2,
  setUsername,
  setAvatar,
  isValidUser,
  setIsValidUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      formTitle="Edit Profile"
      isValidUser={isValidUser}
      setIsValidUser={setIsValidUser}
      onSubmit={(e) => {
        onButtonClick(e);
        onClose();
      }}
    >
      <label htmlFor="name">Edit Username</label>
      <input
        type="text"
        placeholder="Enter New Username"
        onChange={(e) => {
          setUsername(e.target.value);
          currentUser.username = e.target.value;
        }}
      />
      <label htmlFor="avatar">Edit Profile Picture</label>
      <input
        type="url"
        placeholder="Enter New Image Url"
        onChange={(e) => {
          setAvatar(e.target.value);
          currentUser.avatar = e.target.value;
        }}
      />
      <div className="modal__buttons">
        <button type="submit" className="modal__submit-button">
          {buttonText1}
        </button>
        <button 
        type="button" 
        className="modal__second-button"
        onClick={()=>onClose()}>
          {buttonText2}
        </button>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
