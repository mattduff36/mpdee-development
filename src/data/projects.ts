export type StudioProject = {
  slug: string;
  title: string;
  category: 'Websites' | 'Platforms';
  sector: string;
  summary: string;
  headline: string;
  description: string;
  challenge: string;
  approach: string;
  features: string[];
  services: string[];
  image: string;
  imageAlt: string;
  url: string;
  colour: string;
};

export const projects: StudioProject[] = [
  {
    slug: 'itrader',
    title: 'iTrader.im',
    category: 'Platforms',
    sector: 'Automotive',
    summary:
      'A vehicle marketplace connecting buyers, private sellers and dealers across the Isle of Man.',
    headline: 'An island marketplace. A complete product.',
    description:
      'iTrader brings vehicle discovery, private selling and dealer stock together in one place. A focused search experience sits alongside the tools sellers need to create listings and manage their presence.',
    challenge:
      'A marketplace has to serve several people well: the buyer narrowing a search, the owner advertising a vehicle and the dealer managing a changing stock list.',
    approach:
      'Give each journey a clear home. Search and filters help buyers explore; seller accounts and dealer tools support listings; vehicle information checks add useful context.',
    features: [
      'Vehicle search with make, model, price and location filters',
      'Private seller accounts and dealer profiles',
      'Saved vehicles, saved searches and seller enquiries',
      'Dealer tools, listing payments and vehicle information checks',
    ],
    services: ['Product design', 'Web development', 'Integrations'],
    image: '/images/work/itrader-2026.jpg',
    imageAlt:
      'iTrader.im vehicle marketplace with search and featured vehicles',
    url: 'https://itrader.im/',
    colour: '#dce9ed',
  },
  {
    slug: 'voiceover-studio-finder',
    title: 'Voiceover Studio Finder',
    category: 'Platforms',
    sector: 'Audio & creative',
    summary:
      'A worldwide directory helping voice artists and producers find the right recording space.',
    headline: 'The right studio. Within reach.',
    description:
      'Built with VoiceoverGuy, Voiceover Studio Finder connects recording studios with the people who need them. Location search, detailed profiles and direct contact make the directory useful on both sides of the microphone.',
    challenge:
      'Great recording spaces can be difficult to discover. Artists need relevant details, while studio owners need a practical way to present their space and receive enquiries.',
    approach:
      'Put location and studio details at the centre of discovery. Give owners a place to manage their listing, and keep contact direct between the artist and the studio.',
    features: [
      'Location search with an adjustable search radius',
      'Studio profiles with photographs, equipment and services',
      'Direct contact between artists and studio owners',
      'Studio dashboard with free and Premium listing options',
    ],
    services: ['Product design', 'Web development', 'Directory platform'],
    image: '/images/work/voiceover-2026.jpg',
    imageAlt:
      'Voiceover Studio Finder recording studio directory and location search',
    url: 'https://voiceoverstudiofinder.com/',
    colour: '#e5ded5',
  },
  {
    slug: 'lee-barrowcliff',
    title: 'Lee Barrowcliff Photography',
    category: 'Websites',
    sector: 'Photography',
    summary:
      'A photography portfolio that gives the images room to speak, with a dedicated route for clients.',
    headline: 'Let the photography do the talking.',
    description:
      'A portfolio for East Midlands photographer Lee Barrowcliff, bringing wedding, portrait, landscape and other collections together with a dedicated client login.',
    challenge:
      'Show a broad range of photography without making the visitor work to find a relevant collection. Keep client access easy to find alongside the public portfolio.',
    approach:
      'Lead with the images, organise the work into clear categories and keep navigation quiet. A distinct client entry point supports the relationship beyond the first visit.',
    features: [
      'Photography collections organised by subject',
      'Image-led portfolio presentation',
      'Dedicated client login',
      'Responsive galleries for desktop and mobile',
    ],
    services: ['Web design', 'Web development', 'Client access'],
    image: '/images/portfolio-images/Lee-Barrowcliff-Photography/lbp-1.png',
    imageAlt: 'Lee Barrowcliff Photography portfolio website',
    url: 'https://www.leebarrowcliffphotography.com/',
    colour: '#e4e7dd',
  },
  {
    slug: 'victoria-rose',
    title: 'Victoria Rose Salon',
    category: 'Websites',
    sector: 'Hair & beauty',
    summary:
      'A welcoming salon website that connects services, the team and online appointment booking.',
    headline: 'A warm welcome before the first appointment.',
    description:
      'A website for Victoria Rose in Mansfield Woodhouse, introducing the salon, its hair and beauty services and the people behind them. Clear booking routes connect discovery with the next appointment.',
    challenge:
      'Help a new customer get a feel for the salon, understand the available treatments and find the booking route without having to hunt for practical information.',
    approach:
      'Bring the salon atmosphere into the design, separate hair and beauty services clearly, and keep booking, opening hours and contact details close at hand.',
    features: [
      'Dedicated hair and beauty service pages',
      'Team profiles and salon photography',
      'Connection to the salon booking system',
      'Opening hours, location and contact information',
    ],
    services: ['Web design', 'Web development', 'Booking integration'],
    image: '/images/portfolio-images/Victoria-Rose-Salon/vr-1.png',
    imageAlt: 'Victoria Rose hair and beauty salon website',
    url: 'https://www.victoriaroselimited.co.uk/',
    colour: '#eadfe4',
  },
  {
    slug: 'ts-bouncy-castle-hire',
    title: 'T&S Bouncy Castle Hire',
    category: 'Platforms',
    sector: 'Events & entertainment',
    summary:
      'A colourful hire website with castle browsing, local service information and an online booking journey.',
    headline: 'From party plans to booking.',
    description:
      'A website and booking experience for a family-run bouncy castle hire business in Edwinstowe. It brings the fun of the product together with the practical details people need when planning an event.',
    challenge:
      'Choosing a bouncy castle involves more than a photograph. Customers need to explore the options, check service information and understand how to make a booking.',
    approach:
      'Pair a lively visual identity with straightforward navigation. Give the castle range, booking route, safety information and common questions their own clear place.',
    features: [
      'Bouncy castle catalogue',
      'Online booking journey',
      'Local delivery and service-area information',
      'Safety guidance and frequently asked questions',
    ],
    services: ['Web design', 'Web development', 'Booking experience'],
    image: '/images/portfolio-images/TS-Bouncy-Castle-Hire/tns-1.png',
    imageAlt: 'T&S Bouncy Castle Hire website and castle catalogue',
    url: 'https://www.bouncy-castle-hire.com/',
    colour: '#e5e7d2',
  },
  {
    slug: 'paintings-by-kay',
    title: 'Paintings by Kay',
    category: 'Websites',
    sector: 'Art & independent retail',
    summary:
      'An artist portfolio and shop for original nature-inspired paintings and commission enquiries.',
    headline: 'A little more room for creativity.',
    description:
      'An online home for Kay and her paintings, combining a gallery, the story behind the work and a shop for available pieces. A contact route makes it easy to ask about a painting or discuss a commission.',
    challenge:
      'Present the artwork with care while making the practical next steps clear: explore the collection, find an available piece or get in touch about something personal.',
    approach:
      'Keep the paintings at the centre of the experience. Connect the gallery to the shop and artist introduction, with a simple enquiry form for questions and commissions.',
    features: [
      'Gallery of original artwork',
      'Online shop for available paintings',
      'Artist introduction and creative background',
      'Contact form for questions and commission enquiries',
    ],
    services: ['Web design', 'Web development', 'E-commerce'],
    image: '/images/portfolio-images/Paintings-by-Kay/pbk-1.png',
    imageAlt: 'Paintings by Kay artist portfolio and original artwork shop',
    url: 'https://www.paintingsbykay.co.uk/',
    colour: '#e5dccc',
  },
  {
    slug: 'lw-barker',
    title: 'L.W. Barker Transport Services',
    category: 'Websites',
    sector: 'Transport & logistics',
    summary:
      'A clear business website presenting transport services, fleet capabilities and quote enquiries.',
    headline: 'A clear route to the right transport.',
    description:
      'A business website for L.W. Barker Transport Services in Newark, presenting its transport services and vehicle fleet. Service details and direct quote routes help visitors explain what they need moved.',
    challenge:
      'Customers need to understand which service and vehicle might suit their load, where the business operates and how to request a quote.',
    approach:
      'Organise the site around services and fleet capabilities. Keep useful vehicle information readable and make quote and contact routes prominent throughout the experience.',
    features: [
      'Local, long-distance and specialist transport services',
      'Fleet information and vehicle capabilities',
      'Quote request and direct contact routes',
      'Coverage and operating-hours information',
    ],
    services: ['Web design', 'Web development', 'Content structure'],
    image: '/images/portfolio-images/LW-Barker-Transport-Services/lwb-1.png',
    imageAlt: 'L.W. Barker Transport Services website and fleet information',
    url: 'https://www.lwbarkertransport.com/',
    colour: '#dde4e7',
  },
];
