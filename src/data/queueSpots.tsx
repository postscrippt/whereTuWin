export type Spot = {
    id: number;
    name: string;
    area?: string;
    landmark?: string[];
    hours?: string;
    lat: number;
    lng: number;
    image?: string;
    nav?: string;
};

export const queueSpots: Spot[] = [
    {
        id: 1,
        name: "TU Main Gate Win",
        area: "Thammasat Rangsit",
        landmark: ["Main Gate"],
        hours: "6:00 AM - 9:00 PM",
        lat: 14.0687,
        lng: 100.6031,
        image: "https://t4.ftcdn.net/jpg/17/18/20/35/360_F_1718203545_v1ncJWA8wWlRKJZ9bEJ90Jxv5TFZbhFL.jpg",
        nav: "https://maps.app.goo.gl/5xj4SgPfzXfSpU3R6",
    },
    { id: 2, name: "B Dorm Bus Stop", lat: 14.0773, lng: 100.5951, image: "https://t4.ftcdn.net/jpg/17/18/20/35/360_F_1718203545_v1ncJWA8wWlRKJZ9bEJ90Jxv5TFZbhFL.jpg" },
    { id: 3, name: "Tops Crosswalk", lat: 14.0763, lng: 100.5966 },
    { id: 4, name: "Beside Green Canteen", lat: 14.0729, lng: 100.6014 },
];
