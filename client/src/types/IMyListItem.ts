export default interface IMyListItem {
    id?: string;
    contentId: string;
    type: 'movie' | 'series';
    addedAt: Date;
}