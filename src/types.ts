export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  dietary: string[];
  calories?: number;
  protein?: number;
  allergens?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  dietary: string[];
  category: string;
  calories?: number;
  protein?: number;
  allergens?: string[];
  description: string;
  chefRecommendation?: boolean;
  special?: boolean;
}