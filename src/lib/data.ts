import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserId } from "@/hooks/use-session";

/* ---------------------------------- types --------------------------------- */

export interface Profile {
  id: string;
  user_id: string;
  name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  onboarded: boolean;
}

export interface StylePreferences {
  user_id: string;
  styles: string[];
  colors: string[];
  occasions: string[];
  budget: string | null;
  shopping_preferences: string | null;
  style_goals: string[];
  notes: string | null;
}

export interface WardrobeItem {
  id: string;
  user_id: string;
  name: string;
  image_url: string | null;
  category: string;
  subcategory: string | null;
  color: string | null;
  secondary_color: string | null;
  brand: string | null;
  size: string | null;
  fit: string | null;
  style: string | null;
  season: string | null;
  price: number | null;
  currency: string | null;
  purchase_date: string | null;
  is_favorite: boolean;
  notes: string | null;
  created_at: string;
}

export interface Outfit {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  occasion: string | null;
  style: string | null;
  image_url: string | null;
  ai_match_score: number | null;
  tags: string[];
  source: string;
  is_public: boolean;
  created_at: string;
}

export interface OutfitItem {
  id: string;
  outfit_id: string;
  wardrobe_item_id: string | null;
  product_id: string | null;
  slot: string | null;
  label: string | null;
  image_url: string | null;
  position: number;
}

export interface Board {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  website: string | null;
  country: string | null;
  category: string | null;
  partner_status: string;
}

export interface Product {
  id: string;
  brand_id: string | null;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  style: string | null;
  price: number | null;
  currency: string;
  external_url: string | null;
  affiliate_url: string | null;
  is_demo: boolean;
  brands?: { name: string } | null;
}

export interface Plan {
  id: string;
  code: string;
  name: string;
  tagline: string | null;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  sort_order: number;
}

/* --------------------------------- helpers -------------------------------- */

function unwrap<T>({ data, error }: { data: T | null; error: unknown }): T {
  if (error) throw error;
  return data as T;
}

/* --------------------------------- profile -------------------------------- */

export function useProfile() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () =>
      unwrap<Profile>(
        await supabase.from("profiles").select("*").eq("user_id", userId!).maybeSingle(),
      ),
  });
}

export function useUpdateProfile() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<Profile>) => {
      const { error } = await supabase.from("profiles").update(patch).eq("user_id", userId!);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function usePreferences() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["preferences", userId],
    enabled: !!userId,
    queryFn: async () =>
      unwrap<StylePreferences>(
        await supabase.from("style_preferences").select("*").eq("user_id", userId!).maybeSingle(),
      ),
  });
}

export function useUpdatePreferences() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<StylePreferences>) => {
      const { error } = await supabase
        .from("style_preferences")
        .upsert({ user_id: userId!, ...patch }, { onConflict: "user_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["preferences"] }),
  });
}

/* -------------------------------- wardrobe -------------------------------- */

export function useWardrobe() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["wardrobe", userId],
    enabled: !!userId,
    queryFn: async () =>
      unwrap<WardrobeItem[]>(
        await supabase
          .from("wardrobe_items")
          .select("*")
          .eq("user_id", userId!)
          .order("created_at", { ascending: false }),
      ),
  });
}

export function useWardrobeItem(id: string) {
  const userId = useUserId();
  return useQuery({
    queryKey: ["wardrobe-item", id, userId],
    enabled: !!userId && !!id,
    queryFn: async () =>
      unwrap<WardrobeItem>(
        await supabase.from("wardrobe_items").select("*").eq("id", id).maybeSingle(),
      ),
  });
}

export function useSaveWardrobeItem() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Partial<WardrobeItem> & { id?: string }) => {
      if (item.id) {
        const { id, ...patch } = item;
        const { error } = await supabase.from("wardrobe_items").update(patch).eq("id", id);
        if (error) throw error;
        return id;
      }
      const { data, error } = await supabase
        .from("wardrobe_items")
        .insert({ ...item, user_id: userId!, name: item.name ?? "Untitled piece" })
        .select("id")
        .single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wardrobe"] });
      qc.invalidateQueries({ queryKey: ["wardrobe-item"] });
    },
  });
}

export function useDeleteWardrobeItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("wardrobe_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wardrobe"] }),
  });
}

/* --------------------------------- outfits -------------------------------- */

export function usePublicOutfits() {
  return useQuery({
    queryKey: ["public-outfits"],
    queryFn: async () =>
      unwrap<Outfit[]>(
        await supabase
          .from("outfits")
          .select("*")
          .eq("is_public", true)
          .order("created_at", { ascending: false }),
      ),
  });
}

export function useMyOutfits() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["my-outfits", userId],
    enabled: !!userId,
    queryFn: async () =>
      unwrap<Outfit[]>(
        await supabase
          .from("outfits")
          .select("*")
          .eq("user_id", userId!)
          .order("created_at", { ascending: false }),
      ),
  });
}

export function useOutfit(id: string) {
  return useQuery({
    queryKey: ["outfit", id],
    enabled: !!id,
    queryFn: async () => {
      const outfit = unwrap<Outfit>(
        await supabase.from("outfits").select("*").eq("id", id).maybeSingle(),
      );
      const items = unwrap<OutfitItem[]>(
        await supabase
          .from("outfit_items")
          .select("*")
          .eq("outfit_id", id)
          .order("position", { ascending: true }),
      );
      return { outfit, items };
    },
  });
}

export interface NewOutfitInput {
  outfit: Partial<Outfit>;
  items: Array<Partial<OutfitItem>>;
}

export function useCreateOutfit() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ outfit, items }: NewOutfitInput) => {
      const { data, error } = await supabase
        .from("outfits")
        .insert({ ...outfit, user_id: userId!, name: outfit.name ?? "New outfit" })
        .select("id")
        .single();
      if (error) throw error;
      if (items.length) {
        const { error: itemsError } = await supabase
          .from("outfit_items")
          .insert(items.map((i, index) => ({ ...i, outfit_id: data.id, position: index })));
        if (itemsError) throw itemsError;
      }
      return data.id as string;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-outfits"] });
      qc.invalidateQueries({ queryKey: ["saved-outfits"] });
    },
  });
}

export function useDeleteOutfit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("outfits").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-outfits"] }),
  });
}

/* ----------------------------- saves and likes ---------------------------- */

export function useSavedOutfits() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["saved-outfits", userId],
    enabled: !!userId,
    queryFn: async () => {
      const rows = unwrap<Array<{ outfit_id: string; outfits: Outfit | null }>>(
        await supabase
          .from("saved_outfits")
          .select("outfit_id, outfits(*)")
          .eq("user_id", userId!)
          .order("created_at", { ascending: false }),
      );
      return rows.map((r) => r.outfits).filter((o): o is Outfit => !!o);
    },
  });
}

export function useSavedOutfitIds() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["saved-outfit-ids", userId],
    enabled: !!userId,
    queryFn: async () => {
      const rows = unwrap<Array<{ outfit_id: string }>>(
        await supabase.from("saved_outfits").select("outfit_id").eq("user_id", userId!),
      );
      return rows.map((r) => r.outfit_id);
    },
  });
}

export function useToggleSave() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ outfitId, saved }: { outfitId: string; saved: boolean }) => {
      if (saved) {
        const { error } = await supabase
          .from("saved_outfits")
          .delete()
          .eq("user_id", userId!)
          .eq("outfit_id", outfitId);
        if (error) throw error;
        return false;
      }
      const { error } = await supabase
        .from("saved_outfits")
        .insert({ user_id: userId!, outfit_id: outfitId });
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["saved-outfits"] });
      qc.invalidateQueries({ queryKey: ["saved-outfit-ids"] });
    },
  });
}

export function useLikedOutfitIds() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["liked-outfit-ids", userId],
    enabled: !!userId,
    queryFn: async () => {
      const rows = unwrap<Array<{ outfit_id: string }>>(
        await supabase.from("likes").select("outfit_id").eq("user_id", userId!),
      );
      return rows.map((r) => r.outfit_id);
    },
  });
}

export function useToggleLike() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ outfitId, liked }: { outfitId: string; liked: boolean }) => {
      if (liked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", userId!)
          .eq("outfit_id", outfitId);
        if (error) throw error;
        return false;
      }
      const { error } = await supabase
        .from("likes")
        .insert({ user_id: userId!, outfit_id: outfitId });
      if (error) throw error;
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["liked-outfit-ids"] }),
  });
}

/* ---------------------------------- boards -------------------------------- */

export function useBoards() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["boards", userId],
    enabled: !!userId,
    queryFn: async () =>
      unwrap<Board[]>(
        await supabase
          .from("boards")
          .select("*")
          .eq("user_id", userId!)
          .order("created_at", { ascending: false }),
      ),
  });
}

export function useBoard(id: string) {
  return useQuery({
    queryKey: ["board", id],
    enabled: !!id,
    queryFn: async () => {
      const board = unwrap<Board>(
        await supabase.from("boards").select("*").eq("id", id).maybeSingle(),
      );
      const rows = unwrap<Array<{ outfits: Outfit | null }>>(
        await supabase
          .from("board_outfits")
          .select("outfits(*)")
          .eq("board_id", id)
          .order("created_at", { ascending: false }),
      );
      return { board, outfits: rows.map((r) => r.outfits).filter((o): o is Outfit => !!o) };
    },
  });
}

export function useSaveBoard() {
  const userId = useUserId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (board: Partial<Board> & { id?: string }) => {
      if (board.id) {
        const { id, ...patch } = board;
        const { error } = await supabase.from("boards").update(patch).eq("id", id);
        if (error) throw error;
        return id;
      }
      const { data, error } = await supabase
        .from("boards")
        .insert({ ...board, user_id: userId!, name: board.name ?? "New board" })
        .select("id")
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["boards"] });
      qc.invalidateQueries({ queryKey: ["board"] });
    },
  });
}

export function useDeleteBoard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("boards").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["boards"] }),
  });
}

export function useAddOutfitToBoard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ boardId, outfitId }: { boardId: string; outfitId: string }) => {
      const { error } = await supabase
        .from("board_outfits")
        .upsert({ board_id: boardId, outfit_id: outfitId }, { onConflict: "board_id,outfit_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board"] }),
  });
}

export function useRemoveOutfitFromBoard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ boardId, outfitId }: { boardId: string; outfitId: string }) => {
      const { error } = await supabase
        .from("board_outfits")
        .delete()
        .eq("board_id", boardId)
        .eq("outfit_id", outfitId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["board"] }),
  });
}

/* ------------------------------- marketplace ------------------------------ */

export function useProducts(search?: string, category?: string) {
  return useQuery({
    queryKey: ["products", search ?? "", category ?? ""],
    queryFn: async () => {
      let query = supabase.from("products").select("*, brands(name)");
      if (search) query = query.ilike("name", `%${search}%`);
      if (category && category !== "All") query = query.eq("category", category);
      return unwrap<Product[]>(await query.order("created_at", { ascending: false }));
    },
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => unwrap<Brand[]>(await supabase.from("brands").select("*").order("name")),
  });
}

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () =>
      unwrap<Plan[]>(await supabase.from("plans").select("*").order("sort_order")),
  });
}

export function useSubscription() {
  const userId = useUserId();
  return useQuery({
    queryKey: ["subscription", userId],
    enabled: !!userId,
    queryFn: async () =>
      unwrap<{ plan: string; status: string }>(
        await supabase
          .from("subscriptions")
          .select("plan, status")
          .eq("user_id", userId!)
          .maybeSingle(),
      ),
  });
}

/* ----------------------------- AI interactions ---------------------------- */

export function useLogInteraction() {
  const userId = useUserId();
  return useMutation({
    mutationFn: async (input: { prompt: string; response: string; context?: unknown }) => {
      if (!userId) return;
      await supabase.from("ai_interactions").insert({
        user_id: userId,
        prompt: input.prompt,
        response: input.response,
        context: (input.context ?? null) as never,
      });
    },
  });
}
