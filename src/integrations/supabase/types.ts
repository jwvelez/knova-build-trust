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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cms_audit_log: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          changes: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          changes?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          changes?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cms_contact_info: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          created_at: string | null
          email: string | null
          emergency_service_cta: string | null
          emergency_service_description: string | null
          emergency_service_phone: string | null
          emergency_service_title: string | null
          form_company_label: string | null
          form_email_label: string | null
          form_message_label: string | null
          form_name_label: string | null
          form_phone_label: string | null
          form_service_label: string | null
          form_submit_text: string | null
          hero_eyebrow: string | null
          hero_heading: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          created_at?: string | null
          email?: string | null
          emergency_service_cta?: string | null
          emergency_service_description?: string | null
          emergency_service_phone?: string | null
          emergency_service_title?: string | null
          form_company_label?: string | null
          form_email_label?: string | null
          form_message_label?: string | null
          form_name_label?: string | null
          form_phone_label?: string | null
          form_service_label?: string | null
          form_submit_text?: string | null
          hero_eyebrow?: string | null
          hero_heading?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          created_at?: string | null
          email?: string | null
          emergency_service_cta?: string | null
          emergency_service_description?: string | null
          emergency_service_phone?: string | null
          emergency_service_title?: string | null
          form_company_label?: string | null
          form_email_label?: string | null
          form_message_label?: string | null
          form_name_label?: string | null
          form_phone_label?: string | null
          form_service_label?: string | null
          form_submit_text?: string | null
          hero_eyebrow?: string | null
          hero_heading?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_footer_content: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          certifications: string[] | null
          company_description: string | null
          contact_heading: string | null
          copyright_text: string | null
          created_at: string | null
          email: string | null
          id: string
          links_heading: string | null
          logo_url: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          certifications?: string[] | null
          company_description?: string | null
          contact_heading?: string | null
          copyright_text?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          links_heading?: string | null
          logo_url?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          certifications?: string[] | null
          company_description?: string | null
          contact_heading?: string | null
          copyright_text?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          links_heading?: string | null
          logo_url?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_homepage_industries: {
        Row: {
          created_at: string | null
          detail: string
          display_order: number | null
          filter_link: string | null
          icon: string
          id: string
          label: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          detail: string
          display_order?: number | null
          filter_link?: string | null
          icon: string
          id?: string
          label: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          detail?: string
          display_order?: number | null
          filter_link?: string | null
          icon?: string
          id?: string
          label?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_homepage_sections: {
        Row: {
          created_at: string | null
          deliver_background_image: string | null
          deliver_description: string | null
          deliver_eyebrow: string | null
          deliver_heading: string | null
          deliver_value_1_description: string | null
          deliver_value_1_icon: string | null
          deliver_value_1_title: string | null
          deliver_value_2_description: string | null
          deliver_value_2_icon: string | null
          deliver_value_2_title: string | null
          deliver_value_3_description: string | null
          deliver_value_3_icon: string | null
          deliver_value_3_title: string | null
          final_cta_button_text: string | null
          final_cta_heading: string | null
          hero_cta_primary: string | null
          hero_cta_secondary: string | null
          hero_description: string | null
          hero_heading: string
          hero_image: string | null
          id: string
          industries_description: string | null
          industries_eyebrow: string | null
          industries_heading: string | null
          interstitial_1_alt: string | null
          interstitial_1_image: string | null
          interstitial_2_alt: string | null
          interstitial_2_image: string | null
          services_cta_text: string | null
          services_description: string | null
          services_eyebrow: string | null
          services_heading: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deliver_background_image?: string | null
          deliver_description?: string | null
          deliver_eyebrow?: string | null
          deliver_heading?: string | null
          deliver_value_1_description?: string | null
          deliver_value_1_icon?: string | null
          deliver_value_1_title?: string | null
          deliver_value_2_description?: string | null
          deliver_value_2_icon?: string | null
          deliver_value_2_title?: string | null
          deliver_value_3_description?: string | null
          deliver_value_3_icon?: string | null
          deliver_value_3_title?: string | null
          final_cta_button_text?: string | null
          final_cta_heading?: string | null
          hero_cta_primary?: string | null
          hero_cta_secondary?: string | null
          hero_description?: string | null
          hero_heading: string
          hero_image?: string | null
          id?: string
          industries_description?: string | null
          industries_eyebrow?: string | null
          industries_heading?: string | null
          interstitial_1_alt?: string | null
          interstitial_1_image?: string | null
          interstitial_2_alt?: string | null
          interstitial_2_image?: string | null
          services_cta_text?: string | null
          services_description?: string | null
          services_eyebrow?: string | null
          services_heading?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deliver_background_image?: string | null
          deliver_description?: string | null
          deliver_eyebrow?: string | null
          deliver_heading?: string | null
          deliver_value_1_description?: string | null
          deliver_value_1_icon?: string | null
          deliver_value_1_title?: string | null
          deliver_value_2_description?: string | null
          deliver_value_2_icon?: string | null
          deliver_value_2_title?: string | null
          deliver_value_3_description?: string | null
          deliver_value_3_icon?: string | null
          deliver_value_3_title?: string | null
          final_cta_button_text?: string | null
          final_cta_heading?: string | null
          hero_cta_primary?: string | null
          hero_cta_secondary?: string | null
          hero_description?: string | null
          hero_heading?: string
          hero_image?: string | null
          id?: string
          industries_description?: string | null
          industries_eyebrow?: string | null
          industries_heading?: string | null
          interstitial_1_alt?: string | null
          interstitial_1_image?: string | null
          interstitial_2_alt?: string | null
          interstitial_2_image?: string | null
          services_cta_text?: string | null
          services_description?: string | null
          services_eyebrow?: string | null
          services_heading?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_homepage_services: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          icon: string
          id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          icon: string
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          icon?: string
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          dominant_color: string | null
          filename: string
          height: number | null
          id: string
          metadata: Json | null
          mime_type: string
          size_bytes: number
          storage_path: string
          uploaded_by: string | null
          url: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          dominant_color?: string | null
          filename: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type: string
          size_bytes: number
          storage_path: string
          uploaded_by?: string | null
          url: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          dominant_color?: string | null
          filename?: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string
          size_bytes?: number
          storage_path?: string
          uploaded_by?: string | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      cms_navigation: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          label: string
          path: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          label: string
          path: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          label?: string
          path?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_pages: {
        Row: {
          created_at: string
          created_by: string | null
          hero_image: string | null
          id: string
          published_at: string | null
          sections: Json
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          hero_image?: string | null
          id?: string
          published_at?: string | null
          sections?: Json
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          hero_image?: string | null
          id?: string
          published_at?: string | null
          sections?: Json
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: []
      }
      cms_projects: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          details: string[]
          display_order: number | null
          featured: boolean | null
          id: string
          image_url: string | null
          published_at: string | null
          size: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          updated_by: string | null
          year: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          details?: string[]
          display_order?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          size?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          updated_by?: string | null
          year: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          details?: string[]
          display_order?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          size?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          updated_by?: string | null
          year?: string
        }
        Relationships: []
      }
      cms_seo: {
        Row: {
          canonical_url: string | null
          created_at: string
          description: string | null
          entity_id: string | null
          entity_type: string
          id: string
          keywords: string[] | null
          og_image: string | null
          og_type: string | null
          robots_follow: boolean | null
          robots_index: boolean | null
          structured_data: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          og_type?: string | null
          robots_follow?: boolean | null
          robots_index?: boolean | null
          structured_data?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          og_type?: string | null
          robots_follow?: boolean | null
          robots_index?: boolean | null
          structured_data?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_service_page: {
        Row: {
          consulting_description: string | null
          consulting_image: string | null
          consulting_title: string | null
          created_at: string | null
          emergency_cta_button_text: string | null
          emergency_cta_description: string | null
          emergency_cta_title: string | null
          final_cta_button1_text: string | null
          final_cta_button2_text: string | null
          final_cta_title: string | null
          fm_description: string | null
          fm_preventive_title: string | null
          fm_reactive_description: string | null
          fm_reactive_title: string | null
          fm_title: string | null
          gc_description: string | null
          gc_title: string | null
          hero_description: string | null
          hero_eyebrow: string | null
          hero_image: string | null
          hero_title: string | null
          id: string
          services_section_description: string | null
          services_section_title: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          consulting_description?: string | null
          consulting_image?: string | null
          consulting_title?: string | null
          created_at?: string | null
          emergency_cta_button_text?: string | null
          emergency_cta_description?: string | null
          emergency_cta_title?: string | null
          final_cta_button1_text?: string | null
          final_cta_button2_text?: string | null
          final_cta_title?: string | null
          fm_description?: string | null
          fm_preventive_title?: string | null
          fm_reactive_description?: string | null
          fm_reactive_title?: string | null
          fm_title?: string | null
          gc_description?: string | null
          gc_title?: string | null
          hero_description?: string | null
          hero_eyebrow?: string | null
          hero_image?: string | null
          hero_title?: string | null
          id?: string
          services_section_description?: string | null
          services_section_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          consulting_description?: string | null
          consulting_image?: string | null
          consulting_title?: string | null
          created_at?: string | null
          emergency_cta_button_text?: string | null
          emergency_cta_description?: string | null
          emergency_cta_title?: string | null
          final_cta_button1_text?: string | null
          final_cta_button2_text?: string | null
          final_cta_title?: string | null
          fm_description?: string | null
          fm_preventive_title?: string | null
          fm_reactive_description?: string | null
          fm_reactive_title?: string | null
          fm_title?: string | null
          gc_description?: string | null
          gc_title?: string | null
          hero_description?: string | null
          hero_eyebrow?: string | null
          hero_image?: string | null
          hero_title?: string | null
          id?: string
          services_section_description?: string | null
          services_section_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      cms_services: {
        Row: {
          category: string | null
          content: Json | null
          created_at: string
          created_by: string | null
          description: string
          details: string | null
          display_order: number | null
          featured: boolean | null
          hero_subtitle: string | null
          hero_title: string | null
          icon: string
          icon_url: string | null
          id: string
          published_at: string | null
          service_type: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          category?: string | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          description: string
          details?: string | null
          display_order?: number | null
          featured?: boolean | null
          hero_subtitle?: string | null
          hero_title?: string | null
          icon: string
          icon_url?: string | null
          id?: string
          published_at?: string | null
          service_type?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          category?: string | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string
          details?: string | null
          display_order?: number | null
          featured?: boolean | null
          hero_subtitle?: string | null
          hero_title?: string | null
          icon?: string
          icon_url?: string | null
          id?: string
          published_at?: string | null
          service_type?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: []
      }
      cms_site_settings: {
        Row: {
          address: string | null
          brand_color: string | null
          contact_email: string | null
          contact_phone: string | null
          favicon_url: string | null
          footer_content: Json
          id: string
          logo_url: string | null
          navigation: Json
          site_description: string | null
          site_title: string
          social_links: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          brand_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          favicon_url?: string | null
          footer_content?: Json
          id?: string
          logo_url?: string | null
          navigation?: Json
          site_description?: string | null
          site_title?: string
          social_links?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          brand_color?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          favicon_url?: string | null
          footer_content?: Json
          id?: string
          logo_url?: string | null
          navigation?: Json
          site_description?: string | null
          site_title?: string
          social_links?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      cms_versions: {
        Row: {
          change_summary: string | null
          changed_by: string | null
          content: Json
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          version: number
        }
        Insert: {
          change_summary?: string | null
          changed_by?: string | null
          content: Json
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          version: number
        }
        Update: {
          change_summary?: string | null
          changed_by?: string | null
          content?: Json
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          version?: number
        }
        Relationships: []
      }
      cms_who_we_are: {
        Row: {
          certifications: string[] | null
          certifications_heading: string | null
          consultants_description: string | null
          consultants_heading: string | null
          created_at: string | null
          cta_button_text: string | null
          cta_heading: string | null
          hero_description: string | null
          hero_eyebrow: string | null
          hero_heading: string | null
          hero_image: string | null
          id: string
          leader_1_bio: string | null
          leader_1_image: string | null
          leader_1_name: string | null
          leader_1_title: string | null
          leader_2_bio: string | null
          leader_2_image: string | null
          leader_2_name: string | null
          leader_2_title: string | null
          leadership_heading: string | null
          mission_heading: string | null
          office_assistance_description: string | null
          office_assistance_heading: string | null
          office_assistance_link: string | null
          overview_paragraph_1: string | null
          overview_paragraph_2: string | null
          social_impact_description: string | null
          social_impact_heading: string | null
          updated_at: string | null
          value_1_description: string | null
          value_1_title: string | null
          value_2_description: string | null
          value_2_title: string | null
          value_3_description: string | null
          value_3_title: string | null
          value_4_description: string | null
          value_4_title: string | null
        }
        Insert: {
          certifications?: string[] | null
          certifications_heading?: string | null
          consultants_description?: string | null
          consultants_heading?: string | null
          created_at?: string | null
          cta_button_text?: string | null
          cta_heading?: string | null
          hero_description?: string | null
          hero_eyebrow?: string | null
          hero_heading?: string | null
          hero_image?: string | null
          id?: string
          leader_1_bio?: string | null
          leader_1_image?: string | null
          leader_1_name?: string | null
          leader_1_title?: string | null
          leader_2_bio?: string | null
          leader_2_image?: string | null
          leader_2_name?: string | null
          leader_2_title?: string | null
          leadership_heading?: string | null
          mission_heading?: string | null
          office_assistance_description?: string | null
          office_assistance_heading?: string | null
          office_assistance_link?: string | null
          overview_paragraph_1?: string | null
          overview_paragraph_2?: string | null
          social_impact_description?: string | null
          social_impact_heading?: string | null
          updated_at?: string | null
          value_1_description?: string | null
          value_1_title?: string | null
          value_2_description?: string | null
          value_2_title?: string | null
          value_3_description?: string | null
          value_3_title?: string | null
          value_4_description?: string | null
          value_4_title?: string | null
        }
        Update: {
          certifications?: string[] | null
          certifications_heading?: string | null
          consultants_description?: string | null
          consultants_heading?: string | null
          created_at?: string | null
          cta_button_text?: string | null
          cta_heading?: string | null
          hero_description?: string | null
          hero_eyebrow?: string | null
          hero_heading?: string | null
          hero_image?: string | null
          id?: string
          leader_1_bio?: string | null
          leader_1_image?: string | null
          leader_1_name?: string | null
          leader_1_title?: string | null
          leader_2_bio?: string | null
          leader_2_image?: string | null
          leader_2_name?: string | null
          leader_2_title?: string | null
          leadership_heading?: string | null
          mission_heading?: string | null
          office_assistance_description?: string | null
          office_assistance_heading?: string | null
          office_assistance_link?: string | null
          overview_paragraph_1?: string | null
          overview_paragraph_2?: string | null
          social_impact_description?: string | null
          social_impact_heading?: string | null
          updated_at?: string | null
          value_1_description?: string | null
          value_1_title?: string | null
          value_2_description?: string | null
          value_2_title?: string | null
          value_3_description?: string | null
          value_3_title?: string | null
          value_4_description?: string | null
          value_4_title?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
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
      can_edit: { Args: never; Returns: boolean }
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
      audit_action:
        | "create"
        | "update"
        | "delete"
        | "publish"
        | "unpublish"
        | "login"
      content_status: "draft" | "published" | "archived"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
      audit_action: [
        "create",
        "update",
        "delete",
        "publish",
        "unpublish",
        "login",
      ],
      content_status: ["draft", "published", "archived"],
    },
  },
} as const
