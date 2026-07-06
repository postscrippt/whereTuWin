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

export const Spots: Spot[] = [
    {
        id: 1,
        name: "TU Main Gate Win",
        area: "Thammasat Rangsit",
        landmark: ["Main Gate", "Test"],
        hours: "6:00 AM - 9:00 PM",
        lat: 14.0687,
        lng: 100.6031,
        image: "https://t4.ftcdn.net/jpg/17/18/20/35/360_F_1718203545_v1ncJWA8wWlRKJZ9bEJ90Jxv5TFZbhFL.jpg",
        nav: "https://maps.app.goo.gl/5xj4SgPfzXfSpU3R6",
    },
    { id: 2, name: "B Dorm Bus Stop", area : "Thammasat Rangsit", landmark : ["bus stop", "roundabout"], 
        hours: "6:00 AM - 9:00 PM",lat: 14.0773, lng: 100.5951, image: "https://t4.ftcdn.net/jpg/17/18/20/35/360_F_1718203545_v1ncJWA8wWlRKJZ9bEJ90Jxv5TFZbhFL.jpg"
        , nav: "https://maps.app.goo.gl/v2XCfyUabovvGRVF7" },
    { id: 3, name: "Tops Crosswalk",  area : "Thammasat Rangsit", landmark : ["Tops"], 
        hours: "6:00 AM - 9:00 PM", lat: 14.0763, lng: 100.5966, nav : "https://maps.app.goo.gl/Nq5M1UDrufdw9K189"},
    { id: 4, name: "Beside Green Canteen", area : "Thammasat Rangsit", landmark : ["Green canteen", "cross walk"], 
        hours: "6:00 AM - 9:00 PM",lat: 14.0729, lng: 100.6014, nav : "https://maps.app.goo.gl/QiPCMzePfiBg2dC87" },
    { id: 5, name: "holder", area : "Thammasat Rangsit", landmark : ["Green canteen", "cross walk"], 
        hours: "6:00 AM - 9:00 PM",lat: 14.0729, lng: 100.6014, nav : "https://maps.app.goo.gl/QiPCMzePfiBg2dC87" },
];

export const queueSpots = Spots;
