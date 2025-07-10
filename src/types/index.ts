// Project types for the Cursor website

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  projectDetails?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}
