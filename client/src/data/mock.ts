import IMyListItem from "../types/IMyListItem";

export const myListMock: Array<IMyListItem> = [
  {
    contentId: "1",
    title: "Movie 1",
    poster: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    trailer: "https://www.youtube.com/watch?v=example1",
    genres: ["Adventure", "Action"],
    ageRestriction: "13+",
    runtime: 130, // 2h 10m => 130 minutes
    type: "movie",
    addedAt: new Date("2024-05-01"),
  },
  {
    contentId: "2",
    title: "Movie 2",
    poster: "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    trailer: "https://www.youtube.com/watch?v=example2",
    genres: ["Romance", "Comedy"],
    ageRestriction: "7+",
    runtime: 110, // 1h 50m
    type: "movie",
    addedAt: new Date("2024-05-02"),
  },
  {
    contentId: "3",
    title: "Movie 3",
    poster: "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    trailer: "https://www.youtube.com/watch?v=example3",
    genres: ["Mystery", "Thriller"],
    ageRestriction: "16+",
    runtime: 125, // 2h 5m
    type: "movie",
    addedAt: new Date("2024-05-03"),
  },
  {
    contentId: "4",
    title: "Movie 4",
    poster: "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    trailer: "https://www.youtube.com/watch?v=example4",
    genres: ["Family", "Drama"],
    ageRestriction: "G",
    runtime: 90, // 1h 30m
    type: "movie",
    addedAt: new Date("2024-05-04"),
  },
  {
    contentId: "5",
    title: "Movie 5",
    poster: "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    trailer: "https://www.youtube.com/watch?v=example5",
    genres: ["Sci-Fi", "Action"],
    ageRestriction: "13+",
    runtime: 150, // 2h 30m
    type: "movie",
    addedAt: new Date("2024-05-05"),
  },
  {
    contentId: "6",
    title: "Movie 6",
    poster: "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    trailer: "https://www.youtube.com/watch?v=example6",
    genres: ["History", "Drama"],
    ageRestriction: "13+",
    runtime: 135, // 2h 15m
    type: "movie",
    addedAt: new Date("2024-05-06"),
  },
  {
    contentId: "7",
    title: "Movie 7",
    poster: "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
    trailer: "https://www.youtube.com/watch?v=example7",
    genres: ["Action", "Thriller"],
    ageRestriction: "18+",
    runtime: 115, // 1h 55m
    type: "movie",
    addedAt: new Date("2024-05-07"),
  },
  {
    contentId: "8",
    title: "Movie 8",
    poster: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    trailer: "https://www.youtube.com/watch?v=example8",
    genres: ["Drama"],
    ageRestriction: "13+",
    runtime: 120, // 2h
    type: "movie",
    addedAt: new Date("2024-05-08"),
  },
  {
    contentId: "9",
    title: "Movie 9",
    poster: "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    trailer: "https://www.youtube.com/watch?v=example9",
    genres: ["Action", "Adventure"],
    ageRestriction: "13+",
    runtime: 140, // 2h 20m
    type: "movie",
    addedAt: new Date("2024-05-09"),
  },
  {
    contentId: "10",
    title: "Movie 10",
    poster: "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    trailer: "https://www.youtube.com/watch?v=example10",
    genres: ["Sci-Fi", "Drama"],
    ageRestriction: "13+",
    runtime: 130, // 2h 10m
    type: "movie",
    addedAt: new Date("2024-05-10"),
  },
];
