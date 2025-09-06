import { cookies } from 'next/headers';
import ReceipeCard from '../components/receipe/Card';

interface Receipe {
  id: number;
  name: string;
  category: string;
  rating?: { rate: number };
  // Match Card.tsx: no null here
  strMealThumb?: string;
  ingredients?: string;
  procedure?: string;
  [key: string]: any;
}

async function fetchReceipes(): Promise<{ meals: any[] | null }> {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

// Next 15: cookies() is async
async function readCustomReceipesFromCookie(): Promise<Receipe[]> {
  const store = await cookies(); // await!
  const raw = store.get('customReceipes')?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as any[];
    // Normalize strMealThumb so it matches Card.tsx (string | undefined)
    return parsed.map((r) => ({
      ...r,
      strMealThumb: typeof r?.strMealThumb === 'string' ? r.strMealThumb : undefined,
    })) as Receipe[];
  } catch {
    return [];
  }
}

export default async function ReceipesPage() {
  const data = await fetchReceipes();

  const apiReceipes: Receipe[] = (data.meals || []).map((meal: any) => ({
    id: Number(meal.idMeal),
    name: meal.strMeal,
    category: meal.strCategory ?? 'Unknown',
    // Normalize here too just in case
    strMealThumb: typeof meal.strMealThumb === 'string' ? meal.strMealThumb : undefined,
    rating: { rate: 0 },
    ...meal,
  }));

  const customReceipes = await readCustomReceipesFromCookie();

  // custom first, then API; de-duplicate by id
  const merged = [...customReceipes, ...apiReceipes];
  const receipes: Receipe[] = Array.from(new Map(merged.map(r => [r.id, r])).values());

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Receipes</h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {receipes.map((item) => (
          <ReceipeCard key={item.id} receipe={item} />
        ))}
      </div>
    </div>
  );
}
