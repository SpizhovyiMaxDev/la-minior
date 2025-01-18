import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";
import { useSelector } from "react-redux";
import Button from "../../ui/Button";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(
    function () {
      setTimeout(() => setShowSuccessMessage(false), 1000);
    },
    [showSuccessMessage],
  );

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    customer,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const username = useSelector((store) => store.user.username);
  const minutesLeft = calcMinutesLeft(estimatedDelivery);
  const isOrderUpdatable =
    minutesLeft > 20 && status === "preparing" && username === customer;

  return (
    <div className="space-y-8 px-4 py-6">
      <p
        className={`fixed left-[50%] top-[20%] z-50 w-64 translate-x-[-50%] translate-y-8 rounded bg-green-500 px-4 py-2 text-white shadow-lg transition-all duration-500 ${showSuccessMessage ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        ✅ Successfully Updated
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="text-md font-medium">
          {deliveryIn >= 0
            ? `Only ${minutesLeft} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item, i) => (
          <OrderItem
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => item.pizzaId === el.id)
                ?.ingredients ?? []
            }
            key={item.pizzaId}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!username && (
        <Button type="small" to="/">
          Sign in
        </Button>
      )}

      {username !== customer && username && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
          <p className="mb-4 sm:mb-0">😃 Create your personal order</p>
          <Button type="small" to="/menu">
            Create order
          </Button>
        </div>
      )}

      {isOrderUpdatable && !isUpdateFormOpen && (
        <Button type="primary" onClick={() => setIsUpdateFormOpen(true)}>
          Update Order
        </Button>
      )}

      {isOrderUpdatable && isUpdateFormOpen && (
        <UpdateOrder
          order={order}
          setIsUpdateFormOpen={setIsUpdateFormOpen}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
