export const site = {
  name: 'Samiya Pathan',
  role: 'Data & Software Engineering',
  location: 'Solapur, Maharashtra, India',
  email: 'samiyapathan0212@gmail.com',
  linkedin: 'https://www.linkedin.com/in/samiya-pathan-340181326/',
  github: 'https://github.com/samiyapathan0212',
  resume: '/Samiya_Pathan_Resume.pdf',
} as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const skillGroups: { title: string; items: string[] }[] = [
  { title: 'Programming', items: ['Python', 'SQL', 'Java'] },
  {
    title: 'Data analytics',
    items: [
      'Pandas',
      'NumPy',
      'scikit-learn',
      'Excel',
      'Power BI',
      'DAX',
      'Tableau',
      'EDA',
      'Data visualization',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    title: 'Development',
    items: ['Spring Boot', 'React', 'TypeScript', 'Node.js', 'Express', 'REST APIs', 'Streamlit'],
  },
  { title: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB / Atlas', 'Redis'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Jupyter Notebook', 'Maven', 'Docker', 'Render'] },
]
