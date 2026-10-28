export type Capability = {
  id: 'websites' | 'platforms' | 'improvements';
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  detail: string;
  includes: string[];
};

export const capabilities: Capability[] = [
  {
    id: 'websites',
    number: '01',
    title: 'Website design and development.',
    shortTitle: 'Website design',
    description:
      'Thoughtful design and clear content that help the right people find you, understand you and get in touch.',
    tags: ['Design', 'Development', 'SEO foundations'],
    detail:
      'From a first website to a full redesign, I shape the structure, content and design around what visitors need to do.',
    includes: [
      'A clear structure and straightforward navigation',
      'Responsive design for phones, tablets and desktops',
      'Accessible, readable content and usable forms',
      'Search foundations, launch and a practical handover',
    ],
  },
  {
    id: 'platforms',
    number: '02',
    title: 'Web apps and platforms.',
    shortTitle: 'Web apps & platforms',
    description:
      'Booking systems, directories, marketplaces and custom tools that turn a complicated job into a simpler one.',
    tags: ['Web apps', 'Integrations', 'Business tools'],
    detail:
      'Some ideas need more than pages. Whether you’re connecting a community, managing bookings or bringing scattered processes together, we’ll work out the flow and build the functionality around it.',
    includes: [
      'User journeys and a clearly defined first release',
      'Accounts, dashboards and content management',
      'Payments, bookings and third-party integrations',
      'Testing, deployment and room for future development',
    ],
  },
  {
    id: 'improvements',
    number: '03',
    title: 'Care and improvements.',
    shortTitle: 'Care & improvements',
    description:
      'A review of what you already have, a focused fix, or the next useful feature.',
    tags: ['Refinements', 'Performance', 'Ongoing care'],
    detail:
      'A complete rebuild isn’t always the right next step. We can look at the site you have, identify what’s getting in the way, and agree a focused set of improvements that make a worthwhile difference.',
    includes: [
      'A review of the current experience and priorities',
      'Design, content and navigation improvements',
      'Performance and accessibility fixes',
      'Maintenance and future updates agreed around your needs',
    ],
  },
];

export const faqs = [
  {
    question: 'How much will my project cost?',
    answer:
      'Website packages start at £100, with the final price based on the pages, content, integrations and functionality you need. Custom platforms are scoped individually. We’ll agree the work and costs before the build begins.',
  },
  {
    question: 'Can you improve my existing website?',
    answer:
      'Yes. Share the link and what you’d like to change. We’ll look at how it was built and whether a focused update, a redesign or a fresh build makes the most sense.',
  },
  {
    question: 'Who will I work with?',
    answer:
      'You’ll speak directly with Matt, the person designing and developing your project. That keeps questions, decisions and feedback close to the work.',
  },
  {
    question: 'Do I need a finished brief?',
    answer:
      'No. An idea, a problem to solve or a link to your current site is enough to start a conversation. Any existing branding, content, examples, budget or timing will help shape the next step.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We’ll agree the handover, hosting and support arrangements as part of your project. If you want ongoing maintenance or new features, we can plan those around what your business needs next.',
  },
];

export const websitePackages = [
  {
    id: 'starter-website',
    title: 'Starter Package',
    price: 100,
    description:
      'A focused landing or holding page to give your business a clear online presence.',
  },
  {
    id: 'basic-website',
    title: 'Basic Package',
    price: 350,
    description:
      'A multi-page website to introduce your business, services and ways to get in touch.',
  },
  {
    id: 'pro-website',
    title: 'Pro Package',
    price: 600,
    description:
      'A more involved website with content and functionality shaped around your business.',
  },
  {
    id: 'ultimate-website',
    title: 'Ultimate Package',
    price: 900,
    description:
      'A starting point for larger websites and projects needing more tailored functionality.',
  },
];
