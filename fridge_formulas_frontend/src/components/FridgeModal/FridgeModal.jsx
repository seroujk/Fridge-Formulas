import "./FridgeModal.css";
import { useState, useEffect } from "react";
function FirdgeModal({
  isOpen,
  formTitle,
  formSubtitle,
  onClose,
  onSubmit,
  buttonText1,
  buttonText2,
  buttonText3,
  openForm,
  formToOpen,
}) {
  const [items, setItems] = useState([{ id: 1, value: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadyButton, setIsReadyButton] = useState(false);
  const [timer, setTimer] = useState(10);
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    if (!isLoading) return;
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isLoading]);

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      value: "",
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal__backdrop">
      <div className="modal modal_opened">
        <button className="modal__close-button" onClick={onClose}>
          Close
        </button>
        <h2>{formTitle}</h2>
        <h3>{formSubtitle}</h3>
        <form
          className="modal__form"
          onSubmit={(e) => {
            onSubmit(items, diet, e);
          }}
        >
          <label htmlFor="diet">Choose Your Diet</label>
          <select
            name="diet-templates"
            id="diet-templates"
            value={diet || ""}
            onChange={(e) => setDiet(e.target.value)}
          >
            <option value="" disabled>
              -- Select Your Diet --
            </option>
            <option value="carnivor">Carnivor (High Protein)</option>
            <option value="vegan">Vegan (Plant Based)</option>
            <option value="omnivor">Omnivor (Balanced)</option>
            <option value="pescatarian">
              Pescatarian (Seafood + Plant Based)
            </option>
          </select>

          {items.map((item, index) => {
            return (
              <div key={item.id}>
                <label htmlFor={`item-${item.id}`}>
                  Fridge Item {index + 1}
                </label>
                <input
                  type="text"
                  minLength="3"
                  id={`item-${item.id}`}
                  value={item.value}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].value = e.target.value;
                    setItems(newItems);
                  }}
                />
              </div>
            );
          })}
          <div className="modal__add-delete-buttons">
            <button
              type="button"
              className="modal__add-button"
              onClick={handleAddItem}
            >
              {buttonText1}
            </button>
            <button
              type="button"
              className="modal__delete-button"
              onClick={handleDeleteItem}
              disabled={items.length <= 1}
            >
              {buttonText2}
            </button>
          </div>
          {!isReadyButton ? (
            <button
              type="submit"
              disabled={!diet || items.length <= 1}
              className="modal__submit-button-fridge"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setTimer(10);
                  setIsLoading(false);
                  setIsReadyButton(true);
                }, 10000);
              }}
            >
              {isLoading
                ? `Your ${diet} meals plans will be ready in ${timer}s`
                : buttonText3}
            </button>
          ) : null}
          {isReadyButton ? (
            <button
              className="modal__submit-button-fridge"
              onClick={() => {
                openForm(formToOpen);
                setIsReadyButton(false);
                setDiet(null);
                setItems([{ id: 1, value: "" }]);
              }}
            >
              Check My Meals!
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default FirdgeModal;
