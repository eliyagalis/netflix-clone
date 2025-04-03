// Interface for "My List" items
export interface IMyListItem {
    contentId: string;
    type: 'movie' | 'series';
    addedAt: Date;
    priority: number; // For custom sorting
  }