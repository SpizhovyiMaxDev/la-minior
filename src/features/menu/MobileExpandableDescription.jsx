import { useState } from "react";
import useMobileDescription from "./useMobileDescripiton";

function MobileExpandableDescription({ ingredients }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMobileDescription();

  return (
    <p className="text-sm italic text-stone-500">
      {isExpanded || !isMobile
        ? ingredients.join(", ") + " "
        : ingredients[0] + ",... "}

      {isMobile && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="cursor-pointer text-blue-500 underline"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </p>
  );
}

export default MobileExpandableDescription;
