'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

 
  const getCookie = (name: string) => {
    const v = document.cookie.split("; ").find(r => r.startsWith(name + "="));
    return v ? decodeURIComponent(v.split("=")[1]) : "";
  };
  const setCookie = (name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 365) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const receipe = {
      id: Date.now(), // unique id for custom item
      name: String(fd.get("mealName") || "").trim(),
      category: String(fd.get("category") || "").trim() || "Custom",
      ingredients: String(fd.get("ingredients") || "").trim(),
      procedure: String(fd.get("procedure") || "").trim(),
      strMealThumb: null, 
    };

    try {
      const existing = JSON.parse(getCookie("customReceipes") || "[]");
      setCookie("customReceipes", JSON.stringify([receipe, ...existing]));
    } catch {
      setCookie("customReceipes", JSON.stringify([receipe]));
    }

    router.push('/receipe');
  };

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="mealName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Meal Name
          </label>
          <input
            type="text"
            id="mealName"
            name="mealName"            
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"           
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg
                       bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="ingredients"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"         
            rows={4}
            placeholder="Type Ingredients here..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                       border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="procedure"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Procedure
          </label>
          <textarea
            id="procedure"
            name="procedure"          
            rows={4}
            placeholder="Type Procedure here..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                       border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"              
          className="inline-flex w-fit items-center self-start justify-self-start
                     text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none
                     focus:ring-4 focus:ring-yellow-300 font-medium rounded-full
                     text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Add Receipe
        </button>
      </form>
    </div>
  );
}
