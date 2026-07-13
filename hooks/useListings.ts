/**
 * Listing query hooks — filter MOCK_LISTINGS in memory.
 *
 * To migrate to Supabase:
 * Replace the useMemo filter logic with a parameterised Supabase query, e.g.:
 *   supabase.from('listings').select('*').eq('category', filters.category).lte('price', filters.maxPrice)
 * useListings() maps cleanly to a single Supabase query with optional filter chaining.
 */
import { useMemo, useState } from 'react';
import { MOCK_LISTINGS } from '../data/mockListings';
import { Listing } from '../types/listing';

export interface ListingFilters {
  category?: string;
  emirate?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export function useListings(filters: ListingFilters = {}) {
  const listings = useMemo(() => {
    let results = MOCK_LISTINGS.filter((l) => l.status !== 'removed');

    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.brand.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.subcategory.toLowerCase().includes(q),
      );
    }

    if (filters.category) {
      results = results.filter((l) => l.category === filters.category);
    }

    if (filters.emirate) {
      results = results.filter((l) => l.emirate === filters.emirate);
    }

    if (filters.condition) {
      results = results.filter((l) => l.condition === filters.condition);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((l) => l.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((l) => l.price <= filters.maxPrice!);
    }

    return results;
  }, [filters.query, filters.category, filters.emirate, filters.condition, filters.minPrice, filters.maxPrice]);

  return listings;
}

export function useFeaturedListings(): Listing[] {
  return useMemo(() => MOCK_LISTINGS.filter((l) => l.isFeatured && l.status === 'active'), []);
}
