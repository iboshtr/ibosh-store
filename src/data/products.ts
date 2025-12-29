export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "Hush Room Spray",
        price: 249,
        originalPrice: 299,
        images: [
            "/hush-spray.png",
            "/hush-spray-1.png",
            "/hush-spray-2.png",
            "/hush-spray-3.png"
        ]
    },
    {
        id: "2",
        name: "Funky Fresh Reed Diffuser",
        price: 299,
        originalPrice: 350,
        images: [
            "/funky-fresh.jpg",
            "/funky-fresh-1.jpg",
            "/funky-fresh-2.jpg",
            "/funky-fresh-3.jpg",
            "/funky-fresh-4.jpg",
            "/funky-fresh-5.jpg"
        ]
    },
    {
        id: "3",
        name: "Tropical Mood Reed Diffuser",
        price: 299,
        originalPrice: 350,
        images: [
            "/tropical-mood.png",
            "/tropical-mood-1.jpg",
            "/tropical-mood-2.jpg",
            "/tropical-mood-3.jpg",
            "/tropical-mood-4.jpg",
            "/tropical-mood-5.jpg",
            "/tropical-mood-6.jpg"
        ]
    }
];
