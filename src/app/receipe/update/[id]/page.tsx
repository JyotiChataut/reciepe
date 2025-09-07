'use client';
import BackButton from "@/app/components/BackButton";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from 'react';

export default function UpdateReceipePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [receipe, setReceipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getCookie = (name: string) => {
    const v = document.cookie.split("; ").find(r => r.startsWith(name + "="));
    return v ? decodeURIComponent(v.split("=")[1]) : "";
  };

  const setCookie = (name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 365) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
  };

  useEffect(() => {
    // Try both cookie names to handle any inconsistency
    let customRecipes = JSON.parse(getCookie("customReceipes") || "[]");
    if (customRecipes.length === 0) {
      customRecipes = JSON.parse(getCookie("customRecipes") || "[]");
    }
    
    const found = customRecipes.find((r: any) => r.id === Number(id));
    console.log('Looking for recipe to update:', id, 'Found:', found);
    if (found) {
      setReceipe(found);
    }
    setLoading(false);
  }, [id]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const updatedReceipe = {
      ...receipe,
      name: String(fd.get("mealName") || "").trim(),
      category: String(fd.get("category") || "").trim() || "Custom",
      ingredients: String(fd.get("ingredients") || "").trim(),
      procedure: String(fd.get("procedure") || "").trim(),
    };

    try {
      // Try both cookie names to handle any inconsistency  
      let existing = JSON.parse(getCookie("customReceipes") || "[]");
      if (existing.length === 0) {
        existing = JSON.parse(getCookie("customRecipes") || "[]");
      }
      
      const updated = existing.map((r: any) => r.id === receipe.id ? updatedReceipe : r);
      setCookie("customReceipes", JSON.stringify(updated));
      
      console.log('Recipe updated successfully');
      router.push("/receipe");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  if (loading) return (
    <div className="py-8">
      <div className="max-w-sm mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          ← Back
        </button>
        <p>Loading...</p>
      </div>
    </div>
  );
  
  if (!receipe) return (
    <div className="py-8">
      <div className="max-w-sm mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          ← Back
        </button>
        <p>Recipe not found</p>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="max-w-sm mx-auto">
        {/* Back Button */}
        <BackButton />

        <h1 className="text-2xl font-bold mb-6">Update Recipe</h1>
        
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label htmlFor="mealName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Meal Name
            </label>
            <input 
              name="mealName" 
              id="mealName" 
              type="text" 
              required 
              defaultValue={receipe.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
          </div>

          <div className="mb-5">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <input 
              name="category" 
              id="category" 
              type="text" 
              defaultValue={receipe.category}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
          </div>

          <div className="mb-5">
            <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ingredients
            </label>
            <textarea 
              name="ingredients" 
              id="ingredients" 
              rows={4} 
              placeholder="Type Ingredients here..." 
              defaultValue={receipe.ingredients}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="procedure" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Procedure
            </label>
            <textarea 
              name="procedure" 
              id="procedure" 
              rows={4} 
              placeholder="Type Procedure here..." 
              defaultValue={receipe.procedure}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="inline-flex w-fit items-center text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Update Recipe
            </button>
            <button
              type="button"
              onClick={() => router.push('/receipe')}
              className="inline-flex w-fit items-center text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}