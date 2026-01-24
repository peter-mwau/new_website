// src/data/services.js
export const company = "Nyota Digital Solutions";

export const services = [
  {
    id: "web2",
    name: "Web2 Applications",
    description:
      "We design and build fast, secure, and scalable web applications tailored to your business needs.",
    offerings: [
      "Business & personal websites",
      "Progressive Web Apps (PWAs)",
      "E-commerce platforms",
      "Admin dashboards & portals",
      "API development & integrations",
    ],
    tech_stack: {
      frontend: ["React", "Next.js", "Vue", "Tailwind CSS"],
      backend: ["Node.js", "Django", "Laravel"],
      database: ["PostgreSQL", "MySQL", "MongoDB"],
      tools: ["Vite", "Webpack", "Postman"],
    },
    tags: ["web development", "web apps", "ecommerce", "frontend", "backend"],
    use_cases: [
      "Online stores",
      "Company websites",
      "School portals",
      "NGO dashboards",
      "Custom business systems",
    ],
    delivery_model: [
      "Custom development",
      "Maintenance & support",
      "Ongoing feature updates",
    ],
  },
  {
    id: "web3",
    name: "Web3 & Blockchain DApps",
    description:
      "We build decentralized applications and blockchain systems that are secure, transparent, and scalable.",
    offerings: [
      "Smart contract development",
      "Decentralized applications (DApps)",
      "NFT platforms & marketplaces",
      "Token creation & tokenomics design",
      "Wallet integrations & blockchain APIs",
    ],
    tech_stack: {
      blockchain: ["Ethereum", "Polygon", "Solana", "BNB Chain"],
      smart_contracts: ["Solidity", "Rust"],
      frontend: ["React", "Next.js", "Web3.js", "Ethers.js"],
      backend: ["Node.js", "Hardhat", "Foundry"],
      storage: ["IPFS", "Filecoin", "Arweave"],
    },
    tags: ["web3", "blockchain", "smart contracts", "dapps", "crypto", "NFT"],
    use_cases: [
      "DeFi platforms",
      "NFT marketplaces",
      "Decentralized identity (DID)",
      "Token-based systems",
      "DAO platforms",
    ],
    delivery_model: [
      "Smart contract audits",
      "End-to-end DApp builds",
      "Blockchain consulting",
    ],
  },
  {
    id: "android",
    name: "Android Applications",
    description:
      "We develop high-performance Android apps with modern design, offline support, and seamless backend integration.",
    offerings: [
      "Native Android apps",
      "Business & productivity apps",
      "E-commerce mobile apps",
      "API integrations",
      "App deployment & Play Store publishing",
    ],
    tech_stack: {
      languages: ["Kotlin", "Java"],
      frameworks: ["Android SDK", "Jetpack Compose"],
      backend: ["Firebase", "Node.js", "Django"],
      databases: ["Room", "SQLite", "Firestore"],
    },
    tags: ["android", "mobile apps", "kotlin", "java", "mobile development"],
    use_cases: [
      "Customer mobile apps",
      "Internal business tools",
      "School & NGO apps",
      "Fintech apps",
      "Logistics & delivery apps",
    ],
    delivery_model: ["Custom app development", "App maintenance", "Performance optimization"],
  },
  {
    id: "ai_ml",
    name: "AI & Machine Learning Applications",
    description:
      "We build intelligent systems using machine learning and AI to automate, predict, and enhance business operations.",
    offerings: [
      "Machine learning models",
      "AI-powered web & mobile apps",
      "Natural Language Processing (NLP)",
      "Computer vision systems",
      "Chatbots & virtual assistants",
    ],
    tech_stack: {
      languages: ["Python"],
      frameworks: ["TensorFlow", "PyTorch", "Scikit-learn"],
      data_tools: ["Pandas", "NumPy", "OpenCV"],
      deployment: ["FastAPI", "Flask", "Docker"],
    },
    tags: ["AI", "machine learning", "data science", "automation", "intelligent systems"],
    use_cases: [
      "Fraud detection",
      "Recommendation systems",
      "Document processing",
      "Customer support bots",
      "Predictive analytics",
    ],
    delivery_model: ["Model development", "AI integration", "Ongoing model improvement"],
  },
  {
    id: "cloud",
    name: "Cloud, DevOps & AWS Services",
    description:
      "We help businesses deploy, scale, and automate their systems using modern cloud infrastructure and DevOps practices.",
    offerings: [
      "Cloud hosting & migration",
      "Docker containerization",
      "CI/CD pipeline setup",
      "Server automation",
      "System monitoring & optimization",
    ],
    tech_stack: {
      cloud_providers: ["AWS", "Google Cloud", "Azure"],
      containers: ["Docker", "Kubernetes"],
      ci_cd: ["GitHub Actions", "GitLab CI", "Jenkins"],
      infrastructure: ["Terraform", "CloudFormation", "Ansible"],
      monitoring: ["Prometheus", "Grafana", "CloudWatch"],
    },
    tags: ["cloud", "devops", "aws", "automation", "infrastructure"],
    use_cases: [
      "High-traffic web apps",
      "Microservices systems",
      "Enterprise deployments",
      "Disaster recovery systems",
      "Scalable startups",
    ],
    delivery_model: ["Cloud setup", "Ongoing infrastructure management", "Performance optimization"],
  },
];

export const global_tags = [
  "custom software",
  "web development",
  "blockchain",
  "AI",
  "mobile apps",
  "cloud services",
  "enterprise solutions",
  "startup solutions",
];

// default export for convenience
export default { company, services, global_tags };
