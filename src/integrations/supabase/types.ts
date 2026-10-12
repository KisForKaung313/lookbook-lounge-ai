export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      affiliate_links: {
        Row: {
          created_at: string
          id: string
          partner: string
          product_id: string
          tracking_code: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          partner: string
          product_id: string
          tracking_code?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          partner?: string
          product_id?: string
          tracking_code?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interactions: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          prompt: string
          response: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          prompt: string
          response?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          prompt?: string
          response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      board_outfits: {
        Row: {
          board_id: string
          created_at: string
          id: string
          outfit_id: string
        }
        Insert: {
          board_id: string
          created_at?: string
          id?: string
          outfit_id: string
        }
        Update: {
          board_id?: string
          created_at?: string
          id?: string
          outfit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_outfits_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_outfits_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
        ]
      }
      boards: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          category: string | null
          country: string | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          partner_status: string
          website: string | null
        }
        Insert: {
          category?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          partner_status?: string
          website?: string | null
        }
        Update: {
          category?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          partner_status?: string
          website?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          outfit_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          outfit_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          outfit_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
        ]
      }
      outfit_items: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          label: string | null
          outfit_id: string
          position: number
          product_id: string | null
          slot: string | null
          wardrobe_item_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          label?: string | null
          outfit_id: string
          position?: number
          product_id?: string | null
          slot?: string | null
          wardrobe_item_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          label?: string | null
          outfit_id?: string
          position?: number
          product_id?: string | null
          slot?: string | null
          wardrobe_item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outfit_items_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outfit_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outfit_items_wardrobe_item_id_fkey"
            columns: ["wardrobe_item_id"]
            isOneToOne: false
            referencedRelation: "wardrobe_items"
            referencedColumns: ["id"]
          },
        ]
      }
      outfits: {
        Row: {
          ai_match_score: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_public: boolean
          name: string
          occasion: string | null
          source: string
          style: string | null
          tags: string[]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_match_score?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name: string
          occasion?: string | null
          source?: string
          style?: string | null
          tags?: string[]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_match_score?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string
          occasion?: string | null
          source?: string
          style?: string | null
          tags?: string[]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          code: string
          created_at: string
          currency: string
          features: string[]
          id: string
          interval: string
          name: string
          price: number
          sort_order: number
          tagline: string | null
        }
        Insert: {
          code: string
          created_at?: string
          currency?: string
          features?: string[]
          id?: string
          interval?: string
          name: string
          price?: number
          sort_order?: number
          tagline?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          currency?: string
          features?: string[]
          id?: string
          interval?: string
          name?: string
          price?: number
          sort_order?: number
          tagline?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_url: string | null
          brand_id: string | null
          category: string | null
          created_at: string
          currency: string
          description: string | null
          external_url: string | null
          id: string
          image_url: string | null
          is_demo: boolean
          name: string
          price: number | null
          style: string | null
          updated_at: string
        }
        Insert: {
          affiliate_url?: string | null
          brand_id?: string | null
          category?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_demo?: boolean
          name: string
          price?: number | null
          style?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_url?: string | null
          brand_id?: string | null
          category?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_demo?: boolean
          name?: string
          price?: number | null
          style?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          name: string | null
          onboarded: boolean
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          onboarded?: boolean
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string | null
          onboarded?: boolean
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      saved_outfits: {
        Row: {
          created_at: string
          id: string
          outfit_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          outfit_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          outfit_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_outfits_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
        ]
      }
      style_preferences: {
        Row: {
          budget: string | null
          colors: string[]
          created_at: string
          id: string
          notes: string | null
          occasions: string[]
          shopping_preferences: string | null
          style_goals: string[]
          styles: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: string | null
          colors?: string[]
          created_at?: string
          id?: string
          notes?: string | null
          occasions?: string[]
          shopping_preferences?: string | null
          style_goals?: string[]
          styles?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: string | null
          colors?: string[]
          created_at?: string
          id?: string
          notes?: string | null
          occasions?: string[]
          shopping_preferences?: string | null
          style_goals?: string[]
          styles?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          currency: string
          expires_at: string | null
          id: string
          plan: string
          price: number
          started_at: string
          status: string
          user_id: string
        }
        Insert: {
          currency?: string
          expires_at?: string | null
          id?: string
          plan?: string
          price?: number
          started_at?: string
          status?: string
          user_id: string
        }
        Update: {
          currency?: string
          expires_at?: string | null
          id?: string
          plan?: string
          price?: number
          started_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      wardrobe_items: {
        Row: {
          brand: string | null
          category: string
          color: string | null
          created_at: string
          currency: string | null
          fit: string | null
          id: string
          image_url: string | null
          is_favorite: boolean
          name: string
          notes: string | null
          price: number | null
          purchase_date: string | null
          season: string | null
          secondary_color: string | null
          size: string | null
          style: string | null
          subcategory: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          brand?: string | null
          category?: string
          color?: string | null
          created_at?: string
          currency?: string | null
          fit?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean
          name: string
          notes?: string | null
          price?: number | null
          purchase_date?: string | null
          season?: string | null
          secondary_color?: string | null
          size?: string | null
          style?: string | null
          subcategory?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          brand?: string | null
          category?: string
          color?: string | null
          created_at?: string
          currency?: string | null
          fit?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean
          name?: string
          notes?: string | null
          price?: number | null
          purchase_date?: string | null
          season?: string | null
          secondary_color?: string | null
          size?: string | null
          style?: string | null
          subcategory?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
