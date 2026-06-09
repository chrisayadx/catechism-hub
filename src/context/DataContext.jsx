import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, hasSupabase } from '../lib/supabase';
import { sessions as staticSessions } from '../data/sessions';
import { resources as staticResources, resourcesNote as staticNote } from '../data/resources';
import { curriculum as staticCurriculum } from '../data/curriculum';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [sessions, setSessions] = useState(staticSessions);
  const [resources, setResources] = useState(staticResources);
  const [curriculum, setCurriculum] = useState(staticCurriculum);
  const [resourcesNote] = useState(staticNote);
  const [loading, setLoading] = useState(false);
  const [usingSupabase, setUsingSupabase] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!hasSupabase) return;
    setLoading(true);
    try {
      const [{ data: dbSessions, error: e1 }, { data: dbResources, error: e2 }, { data: dbCurriculum, error: e3 }] =
        await Promise.all([
          supabase.from('sessions').select('*').order('sort_order'),
          supabase.from('resources_groups').select('*').order('sort_order'),
          supabase.from('curriculum').select('*').order('sort_order'),
        ]);

      if (!e1 && dbSessions?.length) {
        setSessions(dbSessions.map(s => ({
          id: s.id, title: s.title, theme: s.theme, color: s.color,
          topics: s.topics || [], memorize: s.memorize || [], practice: s.practice || [],
        })));
        setUsingSupabase(true);
      }

      if (!e2 && dbResources?.length) {
        setResources({
          free: dbResources.filter(r => r.section === 'free').map(r => ({
            id: r.id, category: r.category, icon: r.icon, items: r.items || [],
          })),
          purchase: dbResources.filter(r => r.section === 'purchase').map(r => ({
            id: r.id, category: r.category, icon: r.icon, items: r.items || [],
          })),
        });
      }

      if (!e3 && dbCurriculum?.length) {
        setCurriculum(dbCurriculum.map(p => ({
          id: p.id, part: p.part_name, color: p.color,
          label: p.label, topics: p.topics || [],
        })));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using static data:', err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Admin mutation helpers ──────────────────────────────────────

  async function saveSession(updated) {
    setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
    if (!hasSupabase) return { error: 'No Supabase configured' };
    const { error } = await supabase.from('sessions').upsert({
      id: updated.id, title: updated.title, theme: updated.theme,
      color: updated.color, topics: updated.topics, memorize: updated.memorize,
      practice: updated.practice, sort_order: updated.id,
    });
    return { error };
  }

  async function saveCurriculumPart(updated) {
    setCurriculum(prev => prev.map(p => p.id === updated.id ? updated : p));
    if (!hasSupabase) return { error: 'No Supabase configured' };
    const { error } = await supabase.from('curriculum').upsert({
      id: updated.id, label: updated.label, part_name: updated.part,
      color: updated.color, topics: updated.topics, sort_order: updated.id,
    });
    return { error };
  }

  async function addResourceGroup(group) {
    const newGroup = { ...group, id: crypto.randomUUID() };
    setResources(prev => ({
      ...prev,
      [group.section]: [...(prev[group.section] || []), newGroup],
    }));
    if (!hasSupabase) return { error: 'No Supabase configured' };
    const { error } = await supabase.from('resources_groups').insert({
      section: group.section, category: group.category,
      icon: group.icon, items: group.items,
      sort_order: Date.now(),
    });
    if (!error) fetchAll();
    return { error };
  }

  async function saveResourceGroup(group) {
    setResources(prev => ({
      free: prev.free.map(g => g.id === group.id ? group : g),
      purchase: prev.purchase.map(g => g.id === group.id ? group : g),
    }));
    if (!hasSupabase) return { error: 'No Supabase configured' };
    const { error } = await supabase.from('resources_groups')
      .update({ category: group.category, icon: group.icon, items: group.items })
      .eq('id', group.id);
    return { error };
  }

  async function deleteResourceGroup(id, section) {
    setResources(prev => ({
      ...prev,
      [section]: prev[section].filter(g => g.id !== id),
    }));
    if (!hasSupabase) return { error: 'No Supabase configured' };
    const { error } = await supabase.from('resources_groups').delete().eq('id', id);
    return { error };
  }

  return (
    <DataContext.Provider value={{
      sessions, resources, curriculum, resourcesNote,
      loading, usingSupabase,
      refresh: fetchAll,
      saveSession, saveCurriculumPart,
      addResourceGroup, saveResourceGroup, deleteResourceGroup,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
