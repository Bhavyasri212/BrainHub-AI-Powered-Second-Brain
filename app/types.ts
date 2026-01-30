export interface KnowledgeItem {
  id: number;
  title: string;
  content: string;
  summary?: string | null;
  type: KnowledgeType; // use the new type
  tags?: string[];
  created_at: string;
  is_pinned: boolean;
  sourceUrl?: string | null;
}

// Define the allowed knowledge types
export type KnowledgeType = "note" | "link" | "insight";
