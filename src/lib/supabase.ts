import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Course {
  id: string
  title: string
  description: string
  duration_months: number
  category: string
  price: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  course_interest: string
  message: string
  status: string
  created_at: string
}

export interface Alumni {
  id: string
  name: string
  photo_url: string
  batch_year: number
  course_completed: string
  current_position: string
  company: string
  testimonial: string
  placement_status: string
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  is_active: boolean
  display_order: number
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  featured_image_url: string
  category: string
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface Metric {
  id: string
  metric_name: string
  metric_value: number
  updated_at: string
}

export interface User {
  id: string
  email: string
  password_hash: string
  role: string
  full_name: string
  created_at: string
  last_login: string
}