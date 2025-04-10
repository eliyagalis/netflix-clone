// Interface for "My List" items
export default interface IMyListItem {
    id?: string;
    contentId: string;
    type: 'movie' | 'series';
    addedAt: Date;
    // priority: number; // For custom sorting
  }