import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import MobileExpandableDescription from "./MobileExpandableDescription";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex items-center gap-4 py-2 xs:items-stretch">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>

        <MobileExpandableDescription ingredients={ingredients} />

        <div className="flex flex-col items-start xs:mt-auto xs:flex-row xs:items-center xs:justify-between">
          {!soldOut ? (
            <p className="mb-1.5 mt-1 text-sm xs:my-0">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="mb-1.5 mt-1 text-sm font-medium uppercase text-stone-500 xs:my-0">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex flex-row gap-3 sm:gap-8">
              <UpdateItemQuantity quantity={currentQuantity} pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
