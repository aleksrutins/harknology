export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      classes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
      }
      discussions: {
        Row: {
          class_id: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          class_id?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          class_id?: string | null
          description?: string | null
          id?: string
          name?: string
        }
      }
      join_codes: {
        Row: {
          class_id: string | null
          code: string
          created_at: string | null
        }
        Insert: {
          class_id?: string | null
          code: string
          created_at?: string | null
        }
        Update: {
          class_id?: string | null
          code?: string
          created_at?: string | null
        }
      }
      responses: {
        Row: {
          content: string
          discussion_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          content: string
          discussion_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          discussion_id?: string | null
          id?: string
          user_id?: string | null
        }
      }
      student_classes: {
        Row: {
          class_id: string | null
          id: number
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          id?: number
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          id?: number
          student_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_class: {
        Args: {
          name: string
          description: string
        }
        Returns: string
      }
      generate_join_code: {
        Args: {
          class_id: string
        }
        Returns: string
      }
      get_join_code: {
        Args: {
          class_id: string
        }
        Returns: string
      }
      join_class: {
        Args: {
          code: string
        }
        Returns: string
      }
      respond_to: {
        Args: {
          discussion_id: string
          content: string
        }
        Returns: string
      }
      update_class: {
        Args: {
          id: string
          name: string
          description: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

