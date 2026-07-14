import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';

// ─── Types ───────────────────────────────────────────────────────────

export interface EventRow {
  id: string;
  title: string;
  year: number;
  category: string;
  civilization_id: string;
  confidence: string;
  summary: string;
  reading_time_min: number | null;
  location: string | null;
  article_body: any;
  ripple_stages: any;
  connected_entities: any;
  interesting_facts: any;
}

export interface CivilizationRow {
  id: string;
  name: string;
  period: string;
  description: string;
  article_count: number;
  image_url: string | null;
}

export interface DynastyRow {
  id: string;
  name: string;
  period: string;
  founder: string | null;
  capital: string | null;
  civilization_id: string | null;
}

export interface PersonalityRow {
  id: string;
  name: string;
  role: string | null;
  era: string | null;
  legacy: string | null;
  civilization_id: string | null;
  short_description: string | null;
  famous_for: string | null;
  historical_period: string | null;
  categories: string[] | null;
  verified: boolean | null;
  featured: boolean | null;
  image_url: string | null;
  thumbnail_url: string | null;
  birth_year: number | null;
  death_year: number | null;
}

export interface CollectionRow {
  id: string;
  title: string;
  description: string | null;
  event_ids: string[] | null;
}

export interface EvidenceSourceRow {
  id: string;
  event_id: string;
  evidence_type: string;
  description: string;
  source_title: string;
  confidence: string;
}

// ─── Generic hook ────────────────────────────────────────────────────

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useSupabaseQuery<T>(
  fetcher: () => Promise<{ data: T | null; error: string | null }>,
  deps: any[],
): QueryState<T> {
  const [state, setState] = useState<QueryState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetcher().then(({ data, error }) => {
      if (cancelled) return;
      setState({ data, loading: false, error });
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

// ─── Event hooks ─────────────────────────────────────────────────────

export function useEvents() {
  return useSupabaseQuery<EventRow[]>(async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('year', { ascending: true });
    if (error) return { data: null, error: error.message };
    return { data: data as EventRow[], error: null };
  }, []);
}

export function useEvent(id: string | undefined) {
  return useSupabaseQuery<EventRow>(async () => {
    if (!id) return { data: null, error: null };
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) return { data: null, error: error.message };
    return { data: data as EventRow, error: null };
  }, [id]);
}

export function useEventEvidence(eventId: string | undefined) {
  return useSupabaseQuery<EvidenceSourceRow[]>(async () => {
    if (!eventId) return { data: null, error: null };
    const { data, error } = await supabase
      .from('evidence_sources')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: true });
    if (error) return { data: null, error: error.message };
    return { data: data as EvidenceSourceRow[], error: null };
  }, [eventId]);
}

// ─── Civilization hooks ──────────────────────────────────────────────

export function useCivilizations() {
  return useSupabaseQuery<CivilizationRow[]>(async () => {
    const { data, error } = await supabase
      .from('civilizations')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) return { data: null, error: error.message };
    return { data: data as CivilizationRow[], error: null };
  }, []);
}

// ─── Dynasty hooks ───────────────────────────────────────────────────

export function useDynasties() {
  return useSupabaseQuery<DynastyRow[]>(async () => {
    const { data, error } = await supabase
      .from('dynasties')
      .select('*')
      .order('name', { ascending: true });
    if (error) return { data: null, error: error.message };
    return { data: data as DynastyRow[], error: null };
  }, []);
}

// ─── Personality hooks ───────────────────────────────────────────────

export function usePersonalities(options?: { featured?: boolean; limit?: number }) {
  const featured = options?.featured;
  const limit = options?.limit;
  return useSupabaseQuery<PersonalityRow[]>(async () => {
    let query = supabase.from('personalities').select('*');
    if (featured) query = query.eq('featured', true);
    query = query.order('name', { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) return { data: null, error: error.message };
    return { data: data as PersonalityRow[], error: null };
  }, [featured, limit]);
}

export function useFeaturedPersonalities(limit = 12) {
  return useSupabaseQuery<PersonalityRow[]>(async () => {
    const { data, error } = await supabase
      .from('personalities')
      .select('*')
      .eq('featured', true)
      .order('name', { ascending: true })
      .limit(limit);
    if (error) return { data: null, error: error.message };
    return { data: data as PersonalityRow[], error: null };
  }, [limit]);
}

// ─── Collection hooks ────────────────────────────────────────────────

export function useCollections() {
  return useSupabaseQuery<CollectionRow[]>(async () => {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) return { data: null, error: error.message };
    return { data: data as CollectionRow[], error: null };
  }, []);
}

// ─── Search hook ─────────────────────────────────────────────────────

export function useSearch(query: string) {
  const [results, setResults] = useState<{
    events: EventRow[];
    civilizations: CivilizationRow[];
    personalities: PersonalityRow[];
    dynasties: DynastyRow[];
  }>({ events: [], civilizations: [], personalities: [], dynasties: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ events: [], civilizations: [], personalities: [], dynasties: [] });
      return;
    }

    setLoading(true);
    const q = query.trim();
    let cancelled = false;

    Promise.all([
      supabase.from('events').select('id,title,year,category,summary,confidence').or(`title.ilike.%${q}%,summary.ilike.%${q}%`).limit(10),
      supabase.from('civilizations').select('id,name,period,description').or(`name.ilike.%${q}%,description.ilike.%${q}%`).limit(5),
      supabase.from('personalities').select('id,name,role,era,legacy').or(`name.ilike.%${q}%,legacy.ilike.%${q}%`).limit(10),
      supabase.from('dynasties').select('id,name,period,founder,capital').or(`name.ilike.%${q}%,founder.ilike.%${q}%`).limit(5),
    ]).then(([eventsRes, civRes, persRes, dynRes]) => {
      if (cancelled) return;
      setResults({
        events: (eventsRes.data as EventRow[]) ?? [],
        civilizations: (civRes.data as CivilizationRow[]) ?? [],
        personalities: (persRes.data as PersonalityRow[]) ?? [],
        dynasties: (dynRes.data as DynastyRow[]) ?? [],
      });
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [query]);

  return { results, loading };
}

// ─── Stats hook ──────────────────────────────────────────────────────

export function useStats() {
  return useSupabaseQuery(async () => {
    const [eventsRes, civRes, dynRes, persRes] = await Promise.all([
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('civilizations').select('id', { count: 'exact', head: true }),
      supabase.from('dynasties').select('id', { count: 'exact', head: true }),
      supabase.from('personalities').select('id', { count: 'exact', head: true }),
    ]);

    return {
      data: {
        events: eventsRes.count ?? 0,
        civilizations: civRes.count ?? 0,
        dynasties: dynRes.count ?? 0,
        personalities: persRes.count ?? 0,
      },
      error: eventsRes.error?.message ?? civRes.error?.message ?? dynRes.error?.message ?? persRes.error?.message ?? null,
    };
  }, []);
}
