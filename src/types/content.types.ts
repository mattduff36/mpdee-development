export interface BasePageConfig {
  path: `/${string}` | string;
  label: string;
  title: string;
  description: string;
  image?: string;
}

export interface Company {
  name: string;
  tagline: string;
  logo: string;
  logoAlt: string;
  email: string;
  location: string;
  domain: string;
  subdomain: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  link: string;
  essential?: boolean;
}

export interface Home extends BasePageConfig {
  image: string;
  headline: React.ReactNode;
  subline: React.ReactNode;
}

export interface WorkPage extends BasePageConfig {}

export interface ServicesPage extends BasePageConfig {}

export interface ContactPage extends BasePageConfig {}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  price: string;
  isPopular?: boolean;
  isComingSoon?: boolean;
  isPartnership?: boolean;
  details: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  technologies: string[];
  outcomes: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ContactChannel {
  icon: string;
  title: string;
  detail: string;
}
