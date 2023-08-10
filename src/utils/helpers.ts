import { IDocument } from "@/types/document";

export function getCategoryUrl(category: string, id?: string): string | null {
  return id ? `/api/metrics/${id}?category=${category}` : null;
}

export async function fetchCategory<C>(url: string): Promise<IDocument<C>> {
  const res = await fetch(url);
  const { metrics }: { metrics: IDocument<C> } = await res.json();
  return metrics;
}

export function newReducerState<C>(state: C, field: keyof C, value: any) {
  return {
    ...state,
    [field]: value,
  };
}

export function newNestedReducerState<C, NC>(
  state: C,
  action: any,
  field: keyof C,
  nestedField: keyof NC
) {
  return {
    ...state,
    [field]: {
      ...state[field],
      [nestedField]: action.payload,
    },
  };
}
