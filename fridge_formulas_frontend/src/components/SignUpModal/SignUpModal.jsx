import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({isOpen,onClose}){
    return(
        <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        formTitle="Sign Up"
        buttonText1="Sign Up"
        buttonText2="Or Log In"
          />
    )
}

export default SignUpModal;