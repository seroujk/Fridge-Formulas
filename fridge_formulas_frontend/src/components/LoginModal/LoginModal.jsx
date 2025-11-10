import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({isOpen,onClose}){
    return(
        <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        formTitle="Log In"
        buttonText1="Login"
        buttonText2="Or Sign Up"
          />
    )
}

export default LoginModal;