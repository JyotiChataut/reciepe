import { cookies } from 'next/headers';
import ReceipeCard from '../components/receipe/Card';
import SearchComponent from '../components/SearchComponent';
import Link from 'next/link';

interface Receipe {
  id: number;
  name: string;
  category: string;
  rating?: { rate: number };
  strMealThumb?: string;
  ingredients?: string;
  procedure?: string;
  [key: string]: any;
}

async function fetchReceipes(searchQuery?: string): Promise<{ meals: any[] | null }> {
  try {
    let url;
    if (searchQuery) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;
    } else {
      // Fetch multiple categories to get more recipes
      const categories = ['beef', 'chicken', 'dessert', 'lamb', 'pasta', 'pork', 'seafood', 'vegetarian'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`;
    }
    
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      // Fallback to search endpoint
      const fallbackRes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken', { cache: 'no-store' });
      if (fallbackRes.ok) {
        return await fallbackRes.json();
      }
    }
    return await res.json();
  } catch (error) {
    console.error('API fetch failed:', error);
    return { meals: null };
  }
}

async function readCustomReceipesFromCookie(): Promise<Receipe[]> {
  const store = await cookies();
  // Try both cookie names to handle any inconsistency
  let raw = store.get('customReceipes')?.value || store.get('customRecipes')?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as any[];
    return parsed.map((r) => ({
      ...r,
      strMealThumb: typeof r?.strMealThumb === 'string' ? r.strMealThumb : undefined,
    })) as Receipe[];
  } catch {
    return [];
  }
}

export default async function ReceipesPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams?.search || '';
  
  // Fetch from API
  const data = await fetchReceipes(searchQuery);
  const apiReceipes: Receipe[] = (data.meals || []).slice(0, 24).map((meal: any) => ({
    id: Number(meal.idMeal),
    name: meal.strMeal,
    category: meal.strCategory ?? 'Unknown',
    strMealThumb: typeof meal.strMealThumb === 'string' ? meal.strMealThumb : undefined,
    rating: { rate: 0 },
    ...meal,
  }));

  // Get custom recipes
  const customReceipes = await readCustomReceipesFromCookie();
  
  // Filter custom recipes by search query if provided
  const filteredCustomReceipes = searchQuery 
    ? customReceipes.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customReceipes;

  // Merge and deduplicate
  const merged = [...filteredCustomReceipes, ...apiReceipes];
  const receipes: Receipe[] = Array.from(new Map(merged.map(r => [r.id, r])).values());

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Receipes</h1>
        <Link 
          href="/receipe/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Recipe
        </Link>
      </div>
      
      <SearchComponent />
      
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-6">
        {receipes.map((item) => (
          <ReceipeCard key={item.id} receipe={item} />
        ))}
      </div>
      
      {receipes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recipes found. Try a different search term!</p>
        </div>
      )}
    </div>
  );
}