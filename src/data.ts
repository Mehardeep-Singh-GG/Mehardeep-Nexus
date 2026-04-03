export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  type: string;
  status: string;
  journal?: string;
  year: string;
  description: string;
  concept: string;
  mathCore: string;
  breakthrough: string;
  validation: string;
  future: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "yang-mills",
    title: "YANG-MILLS",
    slug: "yang-mills-mass-gap",
    subtitle: "Variational and Operator-Theoretic Analysis of Spectral Gaps",
    type: "THEORETICAL PHYSICS",
    status: "PUBLISHED",
    journal: "International Journal of Theoretical Physics (Springer Nature)",
    year: "2026",
    description: "A constructive operator framework for spectral gap analysis in Yang–Mills Hamiltonians using BRST symmetry constraints. This work attempts to solve the 'Mass Gap'—the mystery of why subatomic particles have mass in a universe that should be massless.",
    concept: "Developing a rigorous mathematical framework to explain why subatomic particles have mass even when the underlying equations suggest they shouldn't.",
    mathCore: "Applied BRST symmetry constraints, Osterwalder–Schrader reconstruction, and spectral operator inequalities.",
    breakthrough: "Compared theoretical structure with lattice QCD spectral heuristics, providing a path toward solving the Clay Millennium problem.",
    validation: "Rigorous operator-theoretic proofs and consistency with known QCD data.",
    future: "Extending the framework to full 4D spacetime dynamics.",
    color: "#3b82f6"
  },
  {
    id: "meuwe",
    title: "MEUWE",
    slug: "meuwe",
    subtitle: "Multi-Electron Unified Wave Equation",
    type: "QUANTUM PHYSICS",
    status: "ACCEPTED",
    year: "2025",
    description: "A nonlocal, memory-integrated reformulation of multi-electron quantum systems for exact correlation. MEUWE challenges the standard approximations of quantum chemistry by introducing 'memory' into the wave function.",
    concept: "Introducing a nonlocal and fractional-time correlation operator to capture exact multi-electron interactions without traditional approximations.",
    mathCore: "Reformulated electron dynamics using memory-integrated operator structure.",
    breakthrough: "Achieved exact correlation in systems where traditional Hartree-Fock and DFT methods fail.",
    validation: "Benchmarked against Full CI and VMC computational methods with high precision.",
    future: "Integration into quantum computing algorithms for material discovery.",
    color: "#f97316"
  },
  {
    id: "nexus",
    title: "NEXUS",
    slug: "nexus",
    subtitle: "A Framework for Autonomous Equation Discovery",
    type: "SYMBOLIC AI / CORE",
    status: "UNDER REVIEW",
    journal: "Scientific Reports (Nature Portfolio)",
    year: "2025",
    description: "The heart of the lab. A grammar-constrained DAG-based symbolic discovery engine for reconstructing laws of nature. Nexus doesn't just learn data; it learns the equations that govern the data.",
    concept: "Building autonomous systems that can discover fundamental physical laws directly from raw data using symbolic regression.",
    mathCore: "Designed grammar-constrained DAG-based symbolic discovery engine with evolutionary search.",
    breakthrough: "Discovered interpretable folding dynamics in proteins and novel gravitational kernels.",
    validation: "Successfully rediscovered Kepler's laws and Navier-Stokes approximations from noisy datasets.",
    future: "Scaling to discover unified field theories and complex biological pathways.",
    color: "#ffffff"
  },
  {
    id: "mfe",
    title: "MEMORY FIELD",
    slug: "memory-field-equation",
    subtitle: "Nonlocal Field Reinterpretation",
    type: "THEORETICAL PHYSICS",
    status: "RESEARCH FRAMEWORK",
    year: "2024",
    description: "A quantum reinterpretation of field dynamics incorporating historical state dependence. It treats the vacuum not as a static background, but as a memory-bearing medium.",
    concept: "Treating the vacuum not as a static background, but as a memory-bearing medium where field evolution depends on its history.",
    mathCore: "Nonlocal, memory-bearing field reinterpretation of quantum systems.",
    breakthrough: "Modeled measurement as a coherence perturbation within the memory kernel.",
    validation: "Consistent with Bell inequality violations and delayed-choice experiments.",
    future: "Application to black hole information paradox and early universe cosmology.",
    color: "#a855f7"
  }
];

export const personalInfo = {
  name: "Mehardeep Singh",
  header: "THE ARCHITECT OF NEXUS.",
  role: "Nexus Architect / Independent Researcher",
  location: "Shimla, India",
  email: "mehardeep.sim@gmail.com",
  philosophy: "Reconstructing physics through symbolic intelligence. Building autonomous systems that discover the laws of nature.",
  story: "I build systems that think in symbols and discover in physics. My work is dedicated to the 'Nexus'—a theoretical framework where neural computation meets the absolute laws of the universe. Like the Library of Babel, the Nexus contains all possible truths; my job is to build the compass that finds them.",
  researchAreas: [
    "Symbolic AI & Equation Discovery",
    "Mathematical Physics & Operator Theory",
    "Quantum Field Theory",
    "Nonlocal Field Dynamics"
  ],
  recognition: [
    "Thiel Fellowship Finalist",
    "Annals of Physics Reviewer",
    "NASA Winner (Research Contributions)",
    "Global Rank 36 — ICSE CS Competition",
    "Global Top 100 — IAAC"
  ],
  skills: [
    "Python", "C++", "Node.js", "LaTeX",
    "Functional Analysis", "Spectral Theory", "Operator Theory",
    "Evolutionary Algorithms", "Symbolic Regression", "Bayesian Updating",
    "Quantum Field Theory", "Nonlocal Operators"
  ]
};
