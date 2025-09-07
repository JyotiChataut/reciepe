import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ReceipeCard from '../../components/receipe/Card';
import BackButton from '../../components/BackButton';

interface Receipe {
  id: number;
  name: string;
  category: string;
  ingredients?: string;
  procedure?: string;
  strMealThumb?: string;
  [key: string]: any;
}

async function fetchReceipeById(id: string): Promise<{ meals: any[] | null }> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log('API fetch failed:', error);
  }
  return { meals: null };
}

function collectIngredients(meal: any): string {
  const items: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && String(ing).trim()) {
      items.push(meas ? `${String(meas).trim()} ${String(ing).trim()}` : String(ing).trim());
    }
  }
  return items.join(', ');
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

export default async function ReceipeByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  console.log('Looking for recipe with ID:', id, typeof id); // Debug log

  // 1) Try custom recipes first (for your locally added ids)
  const custom = await readCustomReceipesFromCookie();
  const numericId = Number(id);
  const customFound = custom.find((r) => r.id === numericId);
  
  if (customFound) {
    console.log('Found custom recipe:', customFound.name);
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Recipe Details</h1>
        <div className="grid grid-cols-1 gap-6">
          <BackButton />
          <ReceipeCard receipe={customFound} showReadMore={false} />
        </div>
      </div>
    );
  }

  // 2) Try API (works for MealDB ids like 52768)
  const data = await fetchReceipeById(id);
  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];
    const receipe: Receipe = {
      id: Number(meal.idMeal),
      name: meal.strMeal,
      category: meal.strCategory,
      ingredients: collectIngredients(meal),
      procedure: meal.strInstructions,
      strMealThumb: typeof meal.strMealThumb === 'string' ? meal.strMealThumb : undefined,
      ...meal,
    };

    console.log('Found API recipe:', receipe.name);
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Recipe Details</h1>
        <div className="grid grid-cols-1 gap-6">
          <BackButton />
          <ReceipeCard receipe={receipe} showReadMore={false} />
        </div>
      </div>
    );
  }

  console.log('Recipe not found anywhere');
  notFound();
}