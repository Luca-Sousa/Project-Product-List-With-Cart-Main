export interface ImageData {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: string;
  image: ImageData;
  name: string;
  category: string;
  price: number;
  quantity?: number;
}
