/** Maps project tech label strings to skillIcons registry keys */
const TECH_ALIASES = {
  python: 'python',
  java: 'java',
  javascript: 'javascript',
  typescript: 'typescript',
  react: 'react',
  'node.js': 'nodejs',
  nodejs: 'nodejs',
  flask: 'flask',
  fastapi: 'fastapi',
  django: 'django',
  docker: 'docker',
  kubernetes: 'kubernetes',
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
  'scikit-learn': 'sklearn',
  sklearn: 'sklearn',
  streamlit: 'streamlit',
  langchain: 'langchain',
  neo4j: 'neo4j',
  mysql: 'mysql',
  postgresql: 'postgresql',
  mongodb: 'mongodb',
  redis: 'redis',
  mlflow: 'mlflow',
  git: 'git',
  github: 'github',
  aws: 'aws',
  azure: 'azure',
  gcp: 'gcp',
  graphql: 'graphql',
  'deep learning': 'deep_learning',
  'machine learning': 'ml',
  ml: 'ml',
  rl: 'reinforcement',
  dqn: 'deep_learning',
  nasim: 'cybersecurity',
  groq: 'genai',
  gemini: 'genai',
  des: 'cybersecurity',
  bilstm: 'deep_learning',
};

export const resolveTechIconKey = (label) => {
  if (!label) return null;
  const key = label.trim().toLowerCase();
  return TECH_ALIASES[key] ?? null;
};
