import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { useEffect, useState } from "react";
import { updateOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../../utils/helpers";

function UpdateOrder({ order, setIsUpdateFormOpen, setShowSuccessMessage }) {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { address, status: addressStatus } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";
  const isPrioritized = order.priority;
  const [withPriority, setWithPriority] = useState(isPrioritized);
  const formErrors = fetcher.data?.formErrors;

  function handleUpdateAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  useEffect(
    function () {
      if (fetcher.data?.success) {
        setIsUpdateFormOpen(false);
        setShowSuccessMessage(true);
      }
    },
    [fetcher.data, setIsUpdateFormOpen, setShowSuccessMessage],
  );

  /*
<Form> (React Router) 
 - Purpose: Used for navigation-based form submissions.
<fetcher.Form> (React Router Fetcher API)
 - Purpose: Used for non-navigation form submissions or updating state without changing the route.
*/
  return (
    <fetcher.Form method="PATCH">
      <div className="border border-stone-200 bg-stone-50 px-8 py-6">
        <div className="mb-8 flex flex-wrap justify-between">
          <p className="trancking-wide mb-2 text-xl font-semibold sm:mb-0">
            Want to update order ?
          </p>
        </div>

        <div className="pl-4">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="phone"
                required
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <div className="relative grow">
              <input
                className="input w-full"
                name="address"
                defaultValue={address}
                disabled={isLoadingAddress}
                required
              />

              <span className="absolute right-[0.7%] top-[50%] translate-y-[-50%]">
                <Button
                  type="small"
                  onClick={handleUpdateAddress}
                  disabled={isLoadingAddress}
                >
                  {isLoadingAddress ? "Loading..." : "Update geo..."}
                </Button>
              </span>
            </div>
          </div>

          {!isPrioritized && (
            <div className="flex flex-row flex-nowrap items-center gap-5">
              <input
                type="checkbox"
                className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority" className="font-semibold">
                🤔 Do you want to set a priority this time ?
              </label>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-4 xs:flex-row">
          <Button type="primary">Update Order</Button>
          <Button type="tertiary" onClick={() => setIsUpdateFormOpen(false)}>
            Cancel Update
          </Button>
        </div>
      </div>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { formErrors: {} };

  if (!isValidPhone(data.phone)) {
    errors.formErrors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors.formErrors).length > 0) {
    return errors;
  }

  const newData = { ...data, priority: data.priority === "true" };
  await updateOrder(params.orderId, newData);

  return { success: true };
}
