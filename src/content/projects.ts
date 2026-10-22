import type { Project, ProjectImage } from './types'

/** Screenshots are real captures of the deployed apps, cropped to the page area. */
const shot = (name: string, sourceW: number, sourceH: number, alt: string, caption: string): ProjectImage => ({
  src: `/images/projects/${name}-1600.webp`,
  srcSet: `/images/projects/${name}-800.webp 800w, /images/projects/${name}-1600.webp 1600w`,
  width: 1600,
  height: Math.round((1600 * sourceH) / sourceW),
  alt,
  caption,
})

export const images = {
  foresightHome: shot(
    'foresight-home',
    1916,
    746,
    'FORESIGHT dashboard home page in dark theme: headline KPIs for revenue, units sold, sales at risk and capital locked, a management snapshot, and a sidebar listing the seven pages.',
    'FORESIGHT home page on the live Streamlit app: KPIs and the management snapshot (8 reorder-now, 2 markdown/clear).',
  ),
  shopsphereHero: shot(
    'shopsphere-hero',
    1884,
    897,
    'ShopSphere storefront home page in dark theme with a hero headline, category navigation, search bar, sign-in buttons and a light/dark toggle.',
    'ShopSphere storefront home page on the live deployment.',
  ),
  shopsphereProducts: shot(
    'shopsphere-products',
    1884,
    857,
    'ShopSphere product listing in dark theme showing filters, category chips, sorting and four product cards with ratings and discount badges.',
    'Product listing with search, category filters and sorting over the 14-product demo catalogue.',
  ),
  jobPortalHero: shot(
    'jobportal-hero',
    1884,
    897,
    'Internship & Job Portal home page in dark theme with a headline, keyword search box, domain dropdown and Search button.',
    'Candidate home page: keyword search plus domain filter.',
  ),
  jobPortalListings: shot(
    'jobportal-listings',
    1884,
    897,
    'Opportunity cards on the Internship & Job Portal showing role, company, location, experience level, a short description, posted date and a View Details button.',
    'Paginated opportunity grid (demo listings) with a detail page behind each card.',
  ),
  jobPortalAdmin: shot(
    'jobportal-admin',
    1884,
    897,
    'Admin dashboard on the Internship & Job Portal listing opportunities in a table with Edit and Delete actions and an Add Opportunity button.',
    'Admin dashboard for creating, editing and deleting listings. It currently has no login — see the notes above.',
  ),
  fitnessDashboard: {
    src: '/images/projects/fitness-dashboard.webp',
    width: 1245,
    height: 720,
    alt: 'Power BI dashboard titled Fitness Tracker Activity Analysis with cards for average daily steps, calories and sleep, a steps versus calories scatter plot, steps by day of week, sleep distribution and daily activity composition.',
    caption: 'Fitness tracker dashboard built in Power BI during the Labmentix internship.',
  } satisfies ProjectImage,
}

const gh = (repo: string) => `https://github.com/samiyapathan0212/${repo}`

export const projects: Project[] = [
  {
    slug: 'foresight',
    title: 'FORESIGHT',
    subtitle: 'Demand & Inventory Intelligence',
    category: 'Forecasting & analytics',
    kind: 'Internship project · Zidio Development',
    summary:
      "Turns a simulated retail brand's sales and stock data into a six-week SKU forecast and a ranked list of what to reorder or mark down, served through a seven-page Streamlit dashboard.",
    tech: ['Python', 'Pandas', 'scikit-learn', 'Plotly', 'Streamlit', 'FastAPI', 'Jupyter'],
    stats: [
      { value: '36,550', label: 'daily sales records · 50 SKUs' },
      { value: '11.80%', label: 'WAPE, seasonal-naive (kept)' },
      { value: '15.20%', label: 'WAPE, gradient boosting (rejected)' },
    ],
    links: { live: 'https://foresight-analytics-ai.streamlit.app/', repo: gh('FORESIGHT') },
    image: images.foresightHome,
    featured: true,
    caseStudy: {
      tagline: 'A forecasting project where the simplest model won, and shipped.',
      notice: {
        title: 'Read the numbers with this context',
        points: [
          'The data is synthetic: simulated extracts modelled on a direct-to-consumer home & lifestyle brand. The results demonstrate the method, not a real business.',
          'Rupee figures are estimated exposure under documented business rules, not realised losses.',
          'A read-only FastAPI scoring service is in the repository for local use. The live demo reads generated output files instead, and its sidebar shows the API as offline.',
        ],
      },
      overview: [
        'FORESIGHT is an end-to-end demand forecasting and inventory-risk application. It ingests daily sales, a product master, a calendar and monthly inventory snapshots, validates and cleans them, forecasts weekly demand for every SKU six weeks ahead, and converts that into an action list: reorder now, markdown or clear, watch, or healthy.',
        'The whole pipeline reruns from the raw files with one command, and the dashboard only reads generated outputs. It never recomputes forecasting or risk logic, so what you see always matches the saved results.',
      ],
      problem: [
        'The brand in the scenario plans stock by hand in spreadsheets, which loses money in two directions at once: fast movers run out and those sales are gone, while slow movers pile up, lock up working capital and eventually need markdowns.',
        'Every planning cycle the team needs three answers: how much will we sell, what is about to run out, and what are we holding far more of than we will sell.',
      ],
      contribution: [
        'I wrote the whole project: the validation and cleaning pipeline, the exploratory analysis, the forecasting baseline and model comparison, the risk engine and the Streamlit dashboard.',
        'It is the project associated with my Data Science & Analytics internship at Zidio Development, which is still in progress.',
      ],
      features: [
        'Sales analytics: revenue and unit trends, category and product performance, seasonality and promotion comparison.',
        'Weekly SKU-level demand forecast over a six-week horizon.',
        'Baseline versus gradient-boosting comparison on identical backtest windows.',
        'Inventory coverage, stock position and reorder-point health.',
        'Stockout and overstock detection with estimated rupee exposure and a transparent priority score.',
        'A 360° SKU page that explains in plain language why a product is flagged.',
        'An executive summary page with decisions required and the top five priorities.',
      ],
      architecture: {
        caption: 'Pipeline as described in the repository README.',
        columns: 3,
        stages: [
          {
            title: 'Raw data',
            detail: 'Four source tables',
            items: ['Daily sales', 'SKU master', 'Calendar', 'Inventory snapshots'],
          },
          {
            title: 'Validation & cleaning',
            detail: 'src/pipeline.py',
            items: ['Schema and type checks', 'Duplicates and nulls', 'SKU relationship checks'],
          },
          {
            title: 'Exploratory analysis',
            detail: 'Notebook 01',
            items: ['Seasonality', 'Margin and volatility', 'Promotion effect'],
          },
          {
            title: 'Forecasting',
            detail: 'Notebooks 02 and 03',
            items: ['Seasonal-naive baseline', 'Gradient-boosting challenger', 'Rolling-origin backtests'],
          },
          {
            title: 'Risk engine',
            detail: 'src/risk.py',
            items: ['Stockout and overstock rules', 'Rupee exposure', 'Priority score'],
          },
          {
            title: 'Streamlit dashboard',
            detail: 'app/app.py',
            items: ['Seven pages', 'Reads generated outputs only'],
          },
        ],
      },
      decisions: [
        {
          title: 'Keep the baseline',
          body: 'On the same eight windows the gradient-boosting model scored 15.20% WAPE against 11.80% for seasonal-naive. The baseline stays in production, and the model is documented as evaluated and rejected rather than quietly dropped.',
        },
        {
          title: 'Time-based validation only',
          body: 'Rolling-origin backtesting across eight non-overlapping windows. Lag and rolling features use past information only, each origin trains only on targets already observed, and there is no random train/test split.',
        },
        {
          title: 'Business rules, not a model, for risk',
          body: 'Stockout and overstock flags are deterministic rules with named, configurable constants (for example an overstock multiplier of 2.0). That makes every flag easy to audit and challenge.',
        },
        {
          title: 'Report what is excluded',
          body: 'Inventory covers 200 SKUs but sales and the product master cover only 50. The other 150 stay in the cleaned inventory file, are left out of every decision, and are listed in the data-quality report.',
        },
      ],
      challenges: [
        {
          challenge: 'The more sophisticated model lost the backtest.',
          solution:
            'Reported the result as it was and kept the simpler method, with the comparison visible on the dashboard.',
        },
        {
          challenge: 'Two years of history gives one full year-over-year cycle for a 52-week lookback.',
          solution:
            'The first 52 weeks of each SKU fall back to the previous week (2,600 rows), and the limitation is stated in the project.',
        },
        {
          challenge: 'Inventory snapshots are monthly, not live.',
          solution:
            'The risk engine uses the latest snapshot (1 Dec 2025) and the dashboard shows that date in the sidebar.',
        },
      ],
      metrics: [
        { value: '36,550', label: 'daily sales records' },
        { value: '50', label: 'modelled SKUs (of 200 in inventory)' },
        { value: '6 weeks', label: 'forecast horizon' },
        { value: '8', label: 'rolling-origin backtest windows' },
        { value: '11.80%', label: 'seasonal-naive WAPE (bias +0.0136)' },
        { value: '15.20%', label: 'gradient-boosting WAPE (bias +0.0832)' },
        { value: '8 / 2 / 40', label: 'reorder now / markdown / healthy SKUs' },
        { value: '₹86.35 L', label: 'estimated exposure (₹65.24 L sales at risk + ₹21.11 L capital locked)' },
      ],
      metricsNote:
        'Generated by the project from synthetic data. Gradient boosting scored 28.8% worse than the baseline on the backtest.',
      showWapeChart: true,
      gallery: [images.foresightHome],
      limitations: [
        'Short history, so only one seasonal cycle is available.',
        'Point forecasts only, with no prediction intervals.',
        'Thresholds such as the overstock multiplier are assumptions, not learned values.',
        'Lead-time demand is capped at the six-week horizon, which understates SKUs with longer lead times.',
      ],
      lessons: [
        'With short history, a well-matched baseline is a hard opponent, and an honest backtest is what shows it.',
        'Showing the rejected alternative next to the chosen one builds more trust than a single flattering number.',
        'A rupee estimate makes a ranked list easier to act on than a risk label alone.',
      ],
      next: [
        'Try per-SKU seasonal decomposition or hierarchical forecasting, and compare honestly against the baseline.',
        'Add prediction intervals and service-level-driven safety stock.',
        'Schedule retraining with backtest monitoring so the production model is re-selected as data arrives.',
        'Replace CSV extracts with a warehouse connection, and make prioritisation margin-aware (16 of 50 SKUs have negative unit margin).',
      ],
    },
  },
  {
    slug: 'shopsphere',
    title: 'ShopSphere',
    subtitle: 'Full-Stack E-Commerce Platform',
    category: 'Full-stack engineering',
    kind: 'Independent project',
    summary:
      'A React and Spring Boot storefront with JWT sessions, a transactional checkout that never oversells stock, order tracking and admin order management. Deployed on Render, with simulated payments.',
    tech: ['Java 23', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Maven'],
    stats: [
      { value: '111', label: 'automated backend tests' },
      { value: '10', label: 'Flyway migrations' },
      { value: '2', label: 'roles, enforced server-side' },
    ],
    links: { live: 'https://shopsphere-frontend-kfka.onrender.com/', repo: gh('ShopSphere') },
    image: images.shopsphereHero,
    featured: true,
    caseStudy: {
      tagline: 'A transactional backend with a storefront on top, and a clear line between what is real and what is demo.',
      notice: {
        title: 'What is real and what is demo',
        points: [
          'The storefront catalogue is mock-backed: home, listing and detail pages render a curated 14-product demo catalogue on the client. Cart, wishlist, checkout, orders, payments and inventory all go through the real backend and PostgreSQL.',
          'Payments are simulated by a sandbox gateway. No card data is collected.',
          'Product, category and inventory management APIs exist and are role-protected, but there is no admin UI for them yet. Admin accounts are promoted in the database.',
          'It runs on a free hosting tier, so the first request after a quiet period can be slow.',
        ],
      },
      overview: [
        'ShopSphere is a full-stack e-commerce application. A React and TypeScript single-page storefront talks to a stateless Spring Boot REST API, backed by PostgreSQL with Flyway-managed migrations and a Redis catalogue cache.',
        'It covers the customer journey end to end — sign-in, browsing, cart, wishlist, sandbox checkout with payment confirmation, order history, tracking and cancellation — plus role-protected admin order management.',
      ],
      problem: [
        'A checkout has to stay correct when several people buy the last items at once, when a payment is declined halfway, and when someone double-clicks the button.',
        'I wanted to build the whole path around those cases instead of the happy path alone, with authentication that does not leak tokens.',
      ],
      contribution: [
        'I built the Spring Boot API, the database migrations, authentication and authorization, the automated tests and CI, the Docker setup, and the React front end.',
        'This is an independent project, not client or employer work.',
      ],
      features: [
        'Registration and login with BCrypt-hashed passwords; short-lived JWT access tokens and a rotating refresh token in an HttpOnly cookie.',
        'Cart and wishlist with live badges and server-computed totals.',
        'Checkout with a single guarded submission, a shipping form and a sandbox payment result screen.',
        'Order history, order detail with item and money snapshots, tracking of current status, and cancellation while the lifecycle allows it.',
        'Admin order list with status filter and status changes limited to valid transitions.',
        'Light and dark theme preference persisted in the browser.',
      ],
      architecture: {
        caption: 'Architecture as described in the repository README. In production nginx serves the SPA and proxies /api to the API.',
        columns: 4,
        stages: [
          { title: 'Browser', detail: 'Customer or admin' },
          {
            title: 'React SPA',
            detail: 'React 18 · TypeScript',
            items: ['RTK Query for API calls', 'Access token held in memory'],
          },
          {
            title: 'Spring Boot REST API',
            detail: 'Stateless · JWT',
            items: ['Controller → service → repository', 'DTOs at every boundary', 'Role checks on each endpoint'],
          },
          {
            title: 'Data & services',
            items: ['PostgreSQL 16 with Flyway', 'Redis 7 catalogue cache', 'Sandbox payment gateway'],
          },
        ],
      },
      decisions: [
        {
          title: 'Refresh tokens that cannot be replayed',
          body: 'Refresh tokens are opaque, stored only as SHA-256 hashes, single-use and rotated on every refresh. The cookie is HttpOnly and scoped to the auth path, and the access token lives in memory rather than localStorage.',
        },
        {
          title: 'No fallback signing key',
          body: 'The application refuses to start if the JWT secret is missing or weak, so it can never sign tokens with a built-in default.',
        },
        {
          title: 'One transaction for checkout',
          body: 'Cart validation, stock reservation, order creation with immutable snapshots, the sandbox charge and clearing the cart run in a single transaction. Any failure rolls the whole thing back.',
        },
        {
          title: 'Ordered pessimistic locks',
          body: 'Stock rows are locked in ascending product-id order, which serialises concurrent checkouts without deadlocks. Stock is converted to a sale on approval and released on decline.',
        },
        {
          title: 'The server owns the money',
          body: 'Prices, shipping and totals are always computed server-side from catalogue records, never from client input.',
        },
        {
          title: 'Migrations own the schema',
          body: 'Flyway applies all schema changes at startup and Hibernate only validates, so the schema is never mutated at runtime.',
        },
      ],
      challenges: [
        {
          challenge: 'Two customers checking out the last unit at the same time.',
          solution: 'Pessimistic locking in a fixed order. An insufficient-stock result returns 409, so stock is never oversold.',
        },
        {
          challenge: 'Duplicate orders from a double-click.',
          solution: 'A single guarded submission on the client, with the server transaction as the final authority.',
        },
        {
          challenge: 'A payment declined after stock was reserved.',
          solution: 'The reservation is released, the order is cancelled and the cart stays intact so the customer can retry.',
        },
        {
          challenge: 'Orders moving through states they should not.',
          solution: 'Transitions are validated by the order status model, and invalid ones are rejected with 409 and surfaced in the admin UI.',
        },
      ],
      metrics: [
        { value: '111', label: 'backend tests: services, persistence, validation, controller authorization' },
        { value: '10', label: 'Flyway migrations (V1–V10)' },
        { value: '14', label: 'demo products with seeded stock' },
        { value: '15 min', label: 'default access-token lifetime' },
        { value: 'CI', label: 'GitHub Actions: Maven verify on JDK 23, npm build on Node 22' },
      ],
      metricsNote:
        'Frontend assurance comes from a type-checked production build and manual walkthroughs; there is no frontend unit-test suite yet.',
      gallery: [images.shopsphereHero, images.shopsphereProducts],
      limitations: [
        'The storefront catalogue pages use mock data; the catalogue API is not wired to them yet.',
        'Payments are simulated and there is no refund endpoint.',
        'No admin screens for products, categories or inventory, and no analytics or coupons.',
        'Tracking shows a single current status rather than carrier scan events.',
        'No frontend automated tests.',
      ],
      lessons: [
        'Designing the failure paths first (declined payment, sold-out stock) shaped the transaction boundaries more than the happy path did.',
        'Saying plainly which parts are mocked makes a project easier to trust than overstating it.',
      ],
      next: [
        'Connect the storefront pages to the real catalogue API with server-side search and filtering.',
        'Build admin screens for products, categories and inventory.',
        'Swap the sandbox for a real payment provider behind the existing gateway interface, including refunds.',
        'Add a frontend test suite alongside the backend one.',
      ],
    },
  },
  {
    slug: 'uniast',
    title: 'UniAST',
    subtitle: 'Universal Smartphone-Based Kinetic Antimicrobial Susceptibility Assessment',
    category: 'Research prototype',
    kind: 'Full-stack research project',
    summary:
      'A research prototype exploring smartphone image inspection, ROI-based image statistics and time-dependent kinetic measurements for antimicrobial susceptibility assessment.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Python', 'FastAPI', 'SQLModel', 'PostgreSQL', 'SQLite', 'Alembic'],
    stats: [],
    links: {
      repo: 'https://github.com/samiyapathan0212/UniAST',
      live: 'https://uni-ast-five.vercel.app',
      api: 'https://uniast-api.onrender.com',
    },
    featured: true,
    caseStudy: {
      tagline: 'A smartphone-based research workflow for exploring image-derived kinetic measurements.',
      notice: {
        title: 'Research prototype · not for clinical use',
        points: [
          'Clinical accuracy and suitability for diagnostic use have not been established; appropriate laboratory validation is required.',
          'The project explores image analysis and measurement tracking. It is not a clinically validated diagnostic system.',
        ],
      },
      overview: [
        'UniAST is a full-stack research prototype designed to explore smartphone-based image analysis and time-dependent measurement tracking for antimicrobial susceptibility assessment.',
        'A research session brings image inspection, region selection, kinetic measurements and calibration records together so the analysis can be revisited over time.',
      ],
      problem: [
        'A useful research workflow needs more than a single image: it needs a way to inspect the image, select a region of interest, relate measurements to a reference baseline and preserve the session context for later review.',
      ],
      contribution: [
        'The application connects a React and TypeScript frontend to a FastAPI backend, with SQLModel persistence and PostgreSQL in production or SQLite for local development.',
      ],
      features: [
        'Upload and inspect images, select a region of interest and review image statistics.',
        'Visualize kinetic measurements over time alongside a reference baseline.',
        'Associate calibration records with research sessions.',
        'Create, view, edit and delete persistent research sessions and analysis records.',
      ],
      architecture: {
        caption: 'High-level architecture from the supplied project description.',
        columns: 3,
        stages: [
          { title: 'React client', detail: 'TypeScript · Vite', items: ['Image upload and ROI workflow', 'Kinetic visualization'] },
          { title: 'FastAPI service', detail: 'Python · SQLModel', items: ['Session and analysis APIs', 'Calibration records'] },
          { title: 'Database', detail: 'PostgreSQL / SQLite', items: ['Persistent sessions', 'Alembic migrations'] },
        ],
      },
      decisions: [
        { title: 'Keep measurements tied to a session', body: 'Research sessions and their analysis records provide a persistent context for revisiting image inspection and measurements.' },
        { title: 'Separate local and production storage', body: 'SQLite supports local development while PostgreSQL is used for production.' },
        { title: 'Treat outputs as exploratory', body: 'The prototype is presented as a research workflow and makes no clinical accuracy claim.' },
      ],
      challenges: [
        { challenge: 'Relating image regions to measurements over time.', solution: 'The workflow combines ROI selection and image statistics with a kinetic visualization and reference baseline.' },
        { challenge: 'Preserving research work between visits.', solution: 'Sessions and analysis records are persisted and support creation, viewing, editing and deletion.' },
      ],
      metrics: [],
      gallery: [],
      limitations: [
        'Clinical accuracy and suitability for diagnostic use have not been established.',
        'Appropriate laboratory validation is required before any diagnostic interpretation.',
        'No test counts, accuracy statistics or scientific findings are claimed here.',
      ],
      lessons: [
        'Image review, region selection and time-dependent measurements need to remain connected to their session context.',
        'Clear research limitations are essential when presenting a health-adjacent prototype.',
      ],
      next: [
        'Validate the image-analysis and measurement workflow under an appropriate laboratory protocol.',
        'Capture genuine application screenshots of image inspection, ROI selection and the kinetic visualization for this case study.',
      ],
    },
  },
  {
    slug: 'internship-job-portal',
    title: 'Internship & Job Portal',
    subtitle: 'Full-stack opportunity board',
    category: 'Full-stack engineering',
    kind: 'Full-stack project · AI Tech Gen Technologies',
    summary:
      'A MERN-style board where candidates search, filter and apply for internships, and an admin interface manages listings and moves applications through pending, reviewed, accepted and rejected.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'Render'],
    stats: [
      { value: '10', label: 'REST endpoints' },
      { value: '4', label: 'application statuses' },
      { value: '8', label: 'app screens' },
    ],
    links: {
      live: 'https://internship-job-portal-nf21.onrender.com/',
      api: 'https://internship-job-portal-api.onrender.com/',
      repo: gh('Internship-job-portal'),
    },
    image: images.jobPortalHero,
    featured: true,
    caseStudy: {
      tagline: 'A small, complete REST + React application, deployed end to end.',
      notice: {
        title: 'Current limits',
        points: [
          'The admin interface has no login yet: admin routes are open to anyone who can reach the app. Authentication and role-based access are first on the roadmap.',
          'Listings on the live site are demo data.',
          'Resumes are submitted as links; there is no file upload.',
          'There is no automated test suite.',
        ],
      },
      overview: [
        'The Internship & Job Portal lets visitors browse a paginated list of opportunities, search by keyword, filter by domain and open a detail page. From there a candidate submits an application, which is stored and confirmed on its own screen.',
        'A separate admin interface creates, edits and deletes opportunities and reviews every application, changing its status from a dropdown in the table.',
      ],
      problem: [
        'Candidates need one place to find opportunities and apply without hunting for links, and an operator needs a simple way to publish listings and keep track of who applied and what happened to them.',
      ],
      contribution: [
        'I built the React front end, the Express REST API, the Mongoose models and validation, and the deployment on Render with a MongoDB Atlas database.',
        'It is the project associated with my Full-Stack Developer internship at AI Tech Gen Technologies.',
      ],
      features: [
        'Paginated opportunity grid with summary statistics.',
        'Case-insensitive keyword search across title, company, domain and description, plus a domain filter built from the data.',
        'Opportunity detail page and a validated application form with a confirmation screen.',
        'Admin: add, edit and delete opportunities, with a confirmation prompt on delete.',
        'Admin: applications table with status dropdown, status filter and server-side pagination.',
        'Responsive layout (one, two and three columns) and a persistent light/dark theme.',
      ],
      architecture: {
        caption: 'Architecture as described in the repository README.',
        columns: 4,
        stages: [
          {
            title: 'React SPA',
            detail: 'Vite · Tailwind CSS',
            items: ['Pages and components', 'Axios service layer'],
          },
          {
            title: 'Express REST API',
            detail: 'Node.js',
            items: ['Routes → controllers → models', 'Central error handler'],
          },
          {
            title: 'Mongoose',
            detail: 'Schemas and validation',
            items: ['Opportunity', 'Application (references an opportunity)'],
          },
          { title: 'MongoDB Atlas', detail: 'Production database' },
        ],
      },
      decisions: [
        {
          title: 'A thin REST layer',
          body: 'Routes map to controllers, controllers hold the query and validation logic, and models enforce field rules. A central handler turns Mongoose validation errors into readable 400 responses.',
        },
        {
          title: 'Server-side pagination',
          body: 'Both the opportunity list and the applications table are paginated on the server, so the client never loads everything.',
        },
        {
          title: 'One API client',
          body: 'A single Axios instance with a configurable base URL. In development Vite proxies /api; in production the build reads VITE_API_URL, so no backend URL is hard-coded.',
        },
        {
          title: 'Design tokens for theming',
          body: 'Colours are CSS custom properties with light and dark values, and the chosen theme is stored in localStorage and restored on load.',
        },
        {
          title: 'Resume as a link',
          body: 'Applications store a resume URL instead of an uploaded file, which keeps the app free of file storage until it is needed.',
        },
      ],
      challenges: [
        {
          challenge: 'Searching across several fields while still filtering by domain.',
          solution: 'A case-insensitive match over title, company, domain and description, combined with a domain filter populated from the distinct domains in the data.',
        },
        {
          challenge: 'Keeping application state consistent between candidate and admin views.',
          solution: 'An enum status (pending, reviewed, accepted, rejected) with a default of pending, updated through one endpoint and filterable in the admin table.',
        },
        {
          challenge: 'Frontend and API hosted on different origins.',
          solution: 'A build-time API URL with a same-origin fallback, plus CORS on the API.',
        },
      ],
      metrics: [
        { value: '10', label: 'REST endpoints across health, opportunities and applications' },
        { value: '8', label: 'application screens, including three for admin' },
        { value: '4', label: 'application statuses tracked' },
        { value: '15', label: 'demo listings across 8 domains on the live site (at time of capture)' },
      ],
      gallery: [images.jobPortalHero, images.jobPortalListings, images.jobPortalAdmin],
      limitations: [
        'Admin routes are unprotected.',
        'Resumes are links, not uploads.',
        'No automated tests.',
        'The client expects the API to be reachable at one configured base URL.',
      ],
      lessons: [
        'Deploying early exposed the frontend/backend origin question that local proxying had hidden.',
        'Writing the limitations down, starting with admin access, is what made the roadmap obvious.',
      ],
      next: [
        'Add admin login, password hashing and role-based access control.',
        'Add candidate accounts, resume upload and email notifications.',
        'Containerise the app and add CI/CD.',
        'Use the existing text index for richer search with facets and sorting.',
      ],
    },
  },

  /* ---------- More analytics work (no case-study page) ---------- */
  {
    slug: 'cognifyz-restaurant-analysis',
    title: 'Cognifyz Restaurant Data Analysis',
    subtitle: 'Exploratory analysis in Jupyter',
    category: 'Data analytics',
    kind: 'Internship project · Cognifyz Technologies',
    summary:
      'Analysis of 9,551 restaurant records (21 original columns) across eleven tasks in three levels, producing 16 visualizations on cuisines, ratings, price categories, geography, votes and service availability.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'Folium', 'Jupyter'],
    stats: [
      { value: '9,551', label: 'records' },
      { value: '16', label: 'visualizations' },
    ],
    links: {},
    featured: false,
  },
  {
    slug: 'superstore-sales-analytics',
    title: 'Superstore Sales Analytics Dashboard',
    subtitle: 'Python cleaning + Power BI',
    category: 'BI dashboard',
    kind: 'Independent project',
    summary:
      'Cleaned and analysed 9,994 retail records, then built a Power BI dashboard with DAX measures, a tooltip page and a drill-through page. Technology leads on sales and profit, some sub-categories sell well but earn little, and heavy discounts squeeze margin.',
    tech: ['Python', 'Pandas', 'Power BI', 'DAX'],
    stats: [{ value: '9,994', label: 'retail records' }],
    links: { repo: gh('Superstore_Sales_Analysis') },
    featured: false,
  },
  {
    slug: 'hr-attrition-dashboard',
    title: 'HR Attrition Dashboard',
    subtitle: 'Python EDA + Power BI',
    category: 'BI dashboard',
    kind: 'Independent project',
    summary:
      'Python analysis and a multi-page Power BI dashboard on employee attrition. Attrition is around 16% and runs higher for ages 26–35, lower income bands and the first two years of tenure, with overtime strongly associated with exits.',
    tech: ['Python', 'Pandas', 'Power BI', 'DAX'],
    stats: [{ value: '~16%', label: 'attrition rate' }],
    links: { repo: gh('HR_Analytics') },
    featured: false,
  },
  {
    slug: 'customer-shopping-behaviour',
    title: 'Customer Shopping Behaviour Analysis',
    subtitle: 'SQL analytics',
    category: 'SQL analytics',
    kind: 'Independent project',
    summary:
      'MySQL analysis of customer transactions using CTEs, subqueries and window functions: revenue by demographics, subscriber versus non-subscriber spend, discount dependency by product and the effect of shipping type, with a dashboard on top.',
    tech: ['MySQL', 'SQL', 'CTEs', 'Window functions'],
    stats: [],
    links: { repo: gh('Customer_Shopping_Behavior_Analysis') },
    featured: false,
  },
  {
    slug: 'fitness-tracker-analysis',
    title: 'Fitness Tracker Activity Analysis',
    subtitle: 'Python + SQL + Power BI',
    category: 'BI dashboard',
    kind: 'Internship project · Labmentix',
    summary:
      'Cleaned and merged 940 daily activity records, queried them in SQL and built a Power BI dashboard on steps versus calories, sleep, steps by day of week and activity composition.',
    tech: ['Python', 'Pandas', 'SQL', 'Power BI'],
    stats: [{ value: '940', label: 'daily records' }],
    links: { repo: gh('fitness-data-analysis') },
    image: images.fitnessDashboard,
    featured: false,
  },
  {
    slug: 'itunes-sql-analysis',
    title: 'iTunes Music Store SQL Analysis',
    subtitle: 'Relational analytics in MySQL',
    category: 'SQL analytics',
    kind: 'Internship project · Labmentix',
    summary:
      'Business questions over a music-store database: top customers, popular genres by country, revenue by city and month, best-selling artists, customer lifetime value and customers inactive for six months, with indexes on the join keys.',
    tech: ['MySQL', 'SQL', 'CTEs', 'Window functions'],
    stats: [],
    links: { repo: gh('itunes-sql-data-analysis') },
    featured: false,
  },
  {
    slug: 'video-game-market-intelligence',
    title: 'Video Game Market Intelligence',
    subtitle: 'Python + MySQL + Power BI',
    category: 'BI dashboard',
    kind: 'Internship project · Labmentix',
    summary:
      'Merged a game-engagement dataset with regional sales, loaded both into a normalised MySQL schema and built Power BI dashboards exploring whether wishlist demand predicts sales, plus platform, genre and regional patterns.',
    tech: ['Python', 'Pandas', 'MySQL', 'Power BI', 'DAX'],
    stats: [],
    links: { repo: gh('video-game-market-intelligence') },
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const moreProjects = projects.filter((p) => !p.featured)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const caseStudyProjects = projects.filter((p) => p.caseStudy)
