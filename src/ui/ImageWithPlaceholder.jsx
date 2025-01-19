import { useState } from "react";

function ImageWithPlaceholder({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={className + " relative"}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 blur-sm"></div>
      )}

      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

export default ImageWithPlaceholder;
