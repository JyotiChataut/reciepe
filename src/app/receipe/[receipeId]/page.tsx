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
  strMealThumb?: string; // match Card.tsx (no null)
  [key: string]: any;
}

async function fetchReceipeById(id: string): Promise<{ meals: any[] | null }> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

// Build a readable ingredients string from strIngredientN/strMeasureN (API meals)
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

// Next 15: cookies() is async
async function readCustomReceipesFromCookie(): Promise<Receipe[]> {
  const store = await cookies();
  const raw = store.get('customReceipes')?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as any[];
    // normalize strMealThumb to string | undefined (no null)
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
  params: Promise<{ receipeId: string }>;
}) {
  const { receipeId } = await params;

  // 1) Try API first (works for MealDB ids like 52768)
  const data = await fetchReceipeById(receipeId);
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

    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Receipe</h1>
        <div className="grid grid-cols-1 gap-6">
          <BackButton />
          <ReceipeCard receipe={receipe} showReadMore={false} />
        </div>
      </div>
    );
  }

  // 2) Fallback: custom receipe from cookie (for your locally added ids)
  const custom = await readCustomReceipesFromCookie();
  const numericId = Number(receipeId);
  const found = custom.find((r) => r.id === numericId);
  if (!found) notFound();

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Receipe</h1>
      <div className="grid grid-cols-1 gap-6">
        <BackButton />
        <ReceipeCard receipe={found} showReadMore={false} />
      </div>
    </div>
  );
}
