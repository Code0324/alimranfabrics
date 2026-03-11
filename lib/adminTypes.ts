export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  description?: string;
  price: number;
  compare_price?: number;
  stock: number;
  image_url?: string;
  is_featured: boolean;
  is_bestseller?: boolean;
  is_new_arrival?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminOrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product?: AdminProduct;
}

export interface AdminOrder {
  id: string;
  user_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_notes?: string;
  items: AdminOrderItem[];
  total_amount: number;
  payment_method: 'cod' | 'easypaisa' | 'jazzcash';
  payment_status: string;
  payment_screenshot?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}
