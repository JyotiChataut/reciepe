'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { 
  ChefHat, 
  Search, 
  BookOpen, 
  Edit3, 
  Save, 
  Plus 
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const getCookie = (name: string) => {
    const v = document.cookie.split("; ").find(r => r.startsWith(name + "="));
    return v ? decodeURIComponent(v.split("=")[1]) : "";
  };
  
  const setCookie = (name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 365) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/receipe?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/receipe');
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const receipe = {
      id: Date.now(),
      name: String(fd.get("mealName") || "").trim(),
      category: String(fd.get("category") || "").trim() || "Custom",
      ingredients: String(fd.get("ingredients") || "").trim(),
      procedure: String(fd.get("procedure") || "").trim(),
      strMealThumb: null, 
    };

    try {
      const existing = JSON.parse(getCookie("customRecipes") || "[]");
      setCookie("customRecipes", JSON.stringify([receipe, ...existing]));
    } catch {
      setCookie("customRecipes", JSON.stringify([receipe]));
    }

    router.push('/receipe');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <ChefHat className="w-16 h-16 text-white mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Recipe Heaven
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
              Discover delicious recipes, create your own culinary masterpieces, and share your favorite dishes with the world!
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center mb-8">
              <div className="flex w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for recipes..."
                  className="flex-1 px-6 py-4 text-gray-700 focus:outline-none text-lg"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold transition-colors duration-200 flex items-center"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/receipe"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Browse All Recipes
              </Link>
              <button
                onClick={() => document.getElementById('quick-add')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Why Choose Recipe Haven?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Search className="w-16 h-16 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Discover Recipes</h3>
              <p className="text-gray-600">
                Search through thousands of recipes from around the world. Find your next favorite dish!
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Edit3 className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Create & Share</h3>
              <p className="text-gray-600">
                Add your own recipes and share your culinary creations with fellow food lovers.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Save className="w-16 h-16 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Save Favorites</h3>
              <p className="text-gray-600">
                Keep all your favorite recipes organized and easily accessible whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Recipe Section */}
      <div id="quick-add" className="py-20 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quick Add Recipe
            </h2>
            <p className="text-gray-600 text-lg">
              Got a great recipe? Share it with the community in just a few steps!
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
               <div className="grid md:grid-cols-2 gap-6">
  <div>
    <label htmlFor="mealName" className="block text-sm font-semibold text-gray-700 mb-2">
      Recipe Name *
    </label>
    <input
      type="text"
      id="mealName"
      name="mealName"
      required
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 text-gray-900"
      placeholder="e.g., Chocolate Chip Cookies"
    />
  </div>

  <div>
    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
      Category
    </label>
    <input
      type="text"
      id="category"
      name="category"
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 text-gray-900"
      placeholder="e.g., Dessert, Main Course"
    />
  </div>
</div>
              </div>

             <div>
  <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2">
    Ingredients
  </label>
  <textarea
    id="ingredients"
    name="ingredients"
    rows={4}
    placeholder="List your ingredients here... 
- 2 cups flour
- 1 cup sugar
- 3 eggs"
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none text-gray-900"
  />
</div>

<div>
  <label htmlFor="procedure" className="block text-sm font-semibold text-gray-700 mb-2">
    Instructions
  </label>
  <textarea
    id="procedure"
    name="procedure"
    rows={5}
    placeholder="Step-by-step cooking instructions...

1. Preheat oven to 350°F
2. Mix dry ingredients...
3. Add wet ingredients..."
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none text-gray-900"
  />
</div>
              <div className="flex justify-center pt-6">
                <button
                  type="submit"              
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 flex items-center gap-2"
                >
                  <ChefHat className="w-5 h-5" />
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <ChefHat className="w-8 h-8 text-orange-400 mr-2" />
              <h3 className="text-2xl font-bold">Recipe Heaven</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your go-to destination for delicious recipes and culinary inspiration.
            </p>
            <div className="flex justify-center space-x-6">
              <Link 
                href="/receipe" 
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                All Recipes
              </Link>
              <Link 
                href="/receipe/add" 
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}