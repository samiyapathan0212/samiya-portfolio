import type { Role } from './types'

/** Newest first. Dates come from the offer letters and certificates. */
export const roles: Role[] = [
  {
    id: 'zidio',
    title: 'Data Science & Analytics Intern',
    org: 'Zidio Development',
    period: '20 Aug 2026 – 19 Nov 2026',
    ongoing: true,
    points: [
      'Built FORESIGHT: raw sales and stock data taken through validation and EDA to a six-week SKU-level forecast and a Streamlit dashboard.',
      'Evaluated forecasts with time-based, rolling-origin backtests. The seasonal-naive baseline (11.80% WAPE) beat gradient boosting (15.20%), so it stayed in production.',
      'Added a rule-based risk engine that flags stockout and overstock per SKU, with estimated rupee exposure and a priority ranking.',
    ],
    projectSlug: 'foresight',
    projectLabel: 'FORESIGHT case study',
    tags: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
  },
  {
    id: 'ai-tech-gen',
    title: 'Full-Stack Developer Intern',
    org: 'AI Tech Gen Technologies',
    period: '10 Sep 2026 – 10 Oct 2026',
    mode: 'Remote',
    points: [
      'Developed the Internship & Job Portal with React, Vite, Node.js, Express and MongoDB (Mongoose), serving opportunities and applications through a REST API.',
      'Implemented opportunity listings with keyword search and domain filtering, and a validated application workflow.',
      'Deployed the frontend and backend on Render with a MongoDB Atlas database; added an admin interface with application status tracking and server-side pagination.',
    ],
    projectSlug: 'internship-job-portal',
    projectLabel: 'Job Portal case study',
    tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas'],
  },
  {
    id: 'cognifyz',
    title: 'Data Analysis Intern',
    org: 'Cognifyz Technologies',
    period: '21 Aug 2026 – 21 Sep 2026',
    points: [
      'Analysed 9,551 restaurant records (21 original columns) in Jupyter using Python, Pandas, NumPy, Matplotlib, Seaborn, SciPy and Folium.',
      'Completed 11 tasks across three levels and produced 16 visualizations covering cuisines, ratings, price categories, geographic patterns, votes and service availability.',
    ],
    projectLabel: 'Listed under more analytics work',
    tags: ['Python', 'Pandas', 'Seaborn', 'Folium'],
  },
  {
    id: 'labmentix',
    title: 'Data Analytics Intern',
    org: 'Labmentix Pvt. Ltd.',
    period: '15 Jan 2026 – 15 Mar 2026',
    points: [
      'Fitness tracker: cleaned and merged daily activity data (940 records) and built a Power BI dashboard on steps, calories, sleep and activity composition.',
      'iTunes Music Store: wrote MySQL analyses over a relational music-store schema using joins, subqueries, CTEs and window functions, and indexed the join keys.',
      'Video game market: cleaned and merged engagement and sales datasets, designed a normalised MySQL schema and built Power BI dashboards comparing demand with revenue.',
    ],
    certificateId: 'labmentix-internship',
    tags: ['SQL', 'Python', 'Power BI', 'MySQL'],
  },
]
