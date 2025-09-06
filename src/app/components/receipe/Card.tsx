import Image from "next/image";
import Link from "next/link";

interface Receipe {
  id: number;
  name: string;
  category: string;
  ingredients?: string;
  procedure?: string;
  strMealThumb?: string; // can be a remote URL or a local path like '/cake.jpg'
  [key: string]: any;
}

// Simple fallback rules: prefer cake for desserts/cakes; otherwise biryani
function pickLocalImage(r: Receipe) {
  const name = (r.name || "").toLowerCase();
  const cat = (r.category || "").toLowerCase();
  if (name.includes("cake") || cat.includes("dessert") || cat.includes("cake")) return "/cake.jpg";
  if (name.includes("biryani") || cat.includes("biryani")) return "/biryani.jpg";
  return "/biryani.jpg"; // default
}

export default function ReceipeCard({
  receipe,
  showReadMore = true,
}: {
  receipe: Receipe;
  showReadMore?: boolean;
}) {
  const imageSrc =
    (receipe.strMealThumb && receipe.strMealThumb.trim() !== "" ? receipe.strMealThumb : pickLocalImage(receipe));

  return (
    <div className="w-full h-max rounded-2xl shadow dark:shadow-amber-50 px-5 py-4">
      <Link href={`/receipe/${receipe.id}`}>
        <Image
          height={500}
          width={500}
          src={imageSrc}
          alt={receipe.name}
          className="w-auto max-h-40 rounded-t-lg object-cover"
        />
      </Link>

      <div className="py-3" />

      <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
        {receipe.category}
      </span>

      <h2 className="mt-2 text-2xl font-semibold">{receipe.name}</h2>

      {/* Optional detail fields */}
      {receipe.ingredients && (
        <p className="mt-3 text-sm">
          <span className="font-medium">Ingredients:</span> {receipe.ingredients}
        </p>
      )}
      {receipe.procedure && (
        <p className="mt-2 text-sm whitespace-pre-line">
          <span className="font-medium">Procedure:</span> {receipe.procedure}
        </p>
      )}

      {/* Show Read more only when asked (list page) */}
      {showReadMore && (
        <Link
          href={`/receipe/${receipe.id}`}
          className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
                     hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      )}

      <div className="mt-1.5 flex gap-2">
        <button
          type="button"
          className="inline-flex w-fit items-center self-start justify-self-start text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Update
        </button>
        <button
          type="button"
          className="inline-flex w-fit items-center self-start justify-self-start text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
