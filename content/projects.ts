export type ProjectCaseStudy = {
  subtitle?: string;
  overview: string;
  objective: string;
  approach: string[];
  findings: string[];
  conclusion: string;
};

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  caseStudy: ProjectCaseStudy;
  image: {
    src: string;
    alt: string;
  };
  detailImage?: {
    src: string;
    alt: string;
  };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "systematic-trading-commodity-trends",
    title: "Systematic Trading on Commodity Trends",
    tags: ["Excel", "Python", "UN Comtrade", "Refinitiv"],
    summary:
      "Explored whether export commodity trends can predict FX movements in commodity-exporting countries.",
    caseStudy: {
      subtitle: "Commodity Trends & Currency Forecasting",
      overview:
        "Project exploring whether export commodity trends can predict FX movements in commodity-exporting countries.",
      objective:
        "Test if rising export revenues drive currency appreciation and falling revenues drive depreciation.",
      approach: [
        "Selected commodity–currency pairs with >30% export share across diverse regions.",
        "Applied trend-following (MA & EMA crossovers at 2–12 months) and breakout strategies to capture commodity cycles.",
        "Built ML models (Linear Regression, SVR, Neural Networks, Random Forest, XGBoost, AdaBoost, Gradient Boosting) using rolling training windows.",
        "Regressed lagged export changes (lag_1 to lag_6) on monthly FX returns to test predictive power.",
      ],
      findings: [
        "Medium-term signals (3/9, 3/12 crossovers) aligned with commodity cycles and currency moves.",
        "Tree-based ML models (Gradient Boosting, Random Forest) captured complex, non-linear FX dynamics most effectively.",
        "Short lags (lag_1) were strong predictors, reflecting short-term autocorrelation in FX returns.",
      ],
      conclusion:
        "Commodity cycles provide meaningful signals for FX, and combining systematic strategies with ML improves predictive accuracy in macro trading contexts.",
    },
    image: {
      src: "/images/projects/trend-trading.png",
      alt: "Systematic trading on commodity trends project preview",
    },
    featured: true,
  },
  {
    slug: "global-economy-research",
    title: "Global Economy Research",
    tags: [
      "Quantitative Modeling",
      "Economic Forecasting",
      "Critical Thinking",
    ],
    summary:
      "Evaluated the sustainability of global economic systems through trade flows, exchange rate regimes, debt dynamics, and fiscal stability.",
    caseStudy: {
      overview:
        "Empirical research and structured policy analysis on global trade, currency systems, and macroeconomic sustainability.",
      objective:
        "Evaluate the sustainability of global economic systems by analyzing trade flows, exchange rate regimes, debt dynamics, and fiscal stability, while developing actionable policy insights.",
      approach: [
        "Directed seven empirical analyses on global trade, currency systems, and current accounts.",
        "Built and applied five macroeconomic models (UIP, PPP, Debt Sustainability) using real-world data.",
        "Engaged in four structured policy debates on economic growth, interest rate trends, fiscal policy, and globalization, guided by the Mundell-Fleming and debt sustainability frameworks.",
      ],
      findings: [
        "Identified vulnerabilities in countries with persistent external imbalances and rigid exchange regimes.",
        "Demonstrated how deviations from parity conditions signal underlying currency pressures.",
        "Highlighted the sensitivity of debt trajectories to interest-growth differentials. Policy debates further emphasized the trade-offs between fiscal expansion and external balance, as well as the role of global capital flows in shaping long-term growth and interest rate paths.",
      ],
      conclusion:
        "Produced policy recommendations to mitigate fiscal imbalances and currency risks, underscoring the importance of anticipating exchange rate corrections and maintaining debt sustainability, and strengthened the ability to articulate and defend evidence-based positions in global economic policy discussions.",
    },
    image: {
      src: "/images/projects/global-economy.jpeg",
      alt: "Global economy research project preview",
    },
    featured: true,
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
