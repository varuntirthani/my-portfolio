import "server-only";
import type { CFAData } from "@/data/cfa-types";

export type {
  CFAData,
  CFALevel,
  CFALevelKey,
  CFAModule,
  CFATopic,
  Difficulty,
  LevelStatus,
} from "@/data/cfa-types";

export const cfaData: CFAData = {
  L1: {
    label: "Level 1",
    status: "passed",         // "passed" | "passed" | "in_progress"
    passDate: "2023",         // approximate, fill in real date
    topics: [
      {
        id: "quant-methods",
        name: "Quantitative Methods",
        category: "Group 3",
        difficulty: "tough",  // "tough" | "medium" | "easy"
        summary: "PV/FV, probability, distributions, hypothesis testing, regression",
        modules: [
          {
            id: "mod-1",
            title: "PV, FV, Annuities",
            notes: [
              "Interest Rates & Discount Rates are used interchangeably",
              "Interest rate components: r = \\text{Real Risk-Free Rate} + \\text{Inflation Premium} + \\text{Default Risk Premium} + \\text{Liquidity Premium} + \\text{Maturity Premium}",
              "Lump-sum Future Value: FV_N = PV₀ × (1 + r)^N",
              "Effective Annual Rate: EAR = \\left(1 + r_{\\text{periodic}}\\right)^m − 1",
              "Ordinary Annuity: The first cash flow occurs at time 1",
              "Annuity Due: The first cash flow occurs at time 0",
              "Perpetuity: PV = A / r",
              "Best practice: Index all calculations at a single point in time before manipulating them",
              "CALC TIP: Use ICONV on BA II Plus for EAR (Effective Annual Rate) — enter NOM, C/Y, then CPT EFF"
            ]
          },
          {
            id: "mod-2",
            title: "Organizing, Visualizing and Describing Data",
            notes: [
              "Numerical (Quantitative) data: Continuous or Discrete. Categorical (Qualitative): Nominal (Unranked) or Ordinal (Ranked)",
              "Cross-Sectional Data: Multiple units at one point in time. Time-Series: One unit over time. Panel: Both",
              "Trimmed Mean: Exclude stated % of lowest and highest values. Winsorized Mean: Replace extremes with boundary values",
              "Deviation from normality: Whether a return distribution deviates from a normal distribution can be assessed with a skewness check",
              "Skewness: $\\frac{1}{n}\\sum_{i=1}^{N}\\frac{(X_i - \\bar{X})^3}{s^3}$",
              "Kurtosis: A measure of the combined weight of the tails of a distribution relative to the rest of the distribution",
              "Excess Kurtosis: $\\frac{1}{n}\\sum_{i=1}^{N}\\frac{(X_i - \\bar{X})^4}{s^4} - 3$",
              "Kurtosis types: Leptokurtic = fat tails (excess kurtosis > 0), Platykurtic = thin tails, Mesokurtic = normal",
              "Spurious correlation: Chance relationship, induced by a calculation that mixes each of two variables with a third variable, or correlation with a shared third variable"
            ]
          },
          {
            id: "mod-3",
            title: "Probability Concepts",
            notes: [
              "Conditional probability: P(A|B) = P(A \\cap B) / P(B)",
              "Independent events: P(A \\cap B) = P(A)P(B)",
              "Total Probability Rule: P(A) = \\sum_{i=1}^{n} P(A \\mid S_i)P(S_i)",
              "Bayes' Formula: $P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$ reverses the 'given that' information",
              "Odds for E: $\\frac{P(E)}{1 - P(E)}$",
              "Odds against E: $\\frac{1 - P(E)}{P(E)}$",
              "The expected value of a random variable is the probability-weighted average of the possible outcomes of the random variable",
              "Expected value: $E(X) = \\sum_{i=1}^{N} P(X_i) X_i$, where $X_i$ is one of $n$ possible outcomes of $X$",
              "The variance of a random variable is the expected value (the probability-weighted average) of squared deviations from the random variable's expected value",
              "Variance: $\\sigma^2(X) = \\sum_{i=1}^{N} P(X_i) [X_i - E(X)]^2$",
              "Covariance: $\\mathrm{Cov}(R_i, R_j) = E[(R_i - E(R_i))(R_j - E(R_j))]$",
              "Correlation: $\\rho(R_i, R_j) = \\frac{\\mathrm{Cov}(R_i, R_j)}{\\sigma(R_i)\\sigma(R_j)}$",
              "Multinomial coefficient: \\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!} — for labelling n objects across k groups"
            ]
          },
          {
            id: "mod-4",
            title: "Common Probability Distributions",
            notes: [
              "Binomial distribution: $X \\sim B(n, p)$, with mean $μ = np$ and variance $σ^2 = np(1 − p)$",
              "Normal distribution: 68% within ±1σ, 95% within ±2σ, 99% within ±3σ",
              "Z-score: Z = (X − μ) / σ. Safety-first ratio: SFR = [E(R_p) − R_L] / σ_p — choose the highest ratio",
              "Lognormal: Bounded below by 0, right-skewed. ln Y is normally distributed",
              "VaR: Loss threshold such that the probability of a larger loss over the specified period equals 1 − the confidence level",
              "Central Limit Theorem: Sum/Mean of large number of independent RVs is normally distributed"
            ]
          },
          {
            id: "mod-5",
            title: "Sampling and Estimation",
            notes: [
              "Sampling Error = Observed Statistic − True Population Parameter",
              "Stratified Random Sampling: Divide into strata, sample proportionally from each",
              "Cluster Sampling: Whole clusters are sampling units; only sampled clusters are included",
              "Confidence Interval: Point Estimate ± Reliability Factor × Standard Error",
              "Bootstrap: Resampling with replacement from observed sample. Jackknife: Leave one out at a time (w/o replacement)",
              "Biases: Data Snooping, Sample Selection Bias, Look-Ahead Bias, Time-Period Bias"
            ]
          },
          {
            id: "mod-6",
            title: "Hypothesis Testing",
            notes: [
              "H₀ is null hypothesis (what we want to reject). H₁ is alternative",
              "Type I Error: False Positive (reject true null). Type II Error: False Negative (fail to reject false null)",
              "p-value: Smallest level of significance at which H₀ can be rejected. Reject when p-value < α (Significance Level)",
              "t-distribution: Symmetric, mean zero, fatter tails than normal. Approaches normal as df → ∞",
              "Chi-square test for variance. F-test for equality of two variances: F = s₁² / s₂²",
              "Spearman rank correlation for non-parametric ranked data"
            ]
          },
          {
            id: "mod-7",
            title: "Introduction to Linear Regression",
            notes: [
              "Dependent variable (Y) explained by independent variable (X)",
              "OLS minimizes sum of squared residuals",
              "R² = Proportion of variation in Y explained by X. F-statistic = MSR / MSE for overall model fit",
              "CLRM assumptions: Linearity, Homoskedasticity, Independence, Normality of residuals",
              "Log-linear model: ln(Y) = b₀ + b₁X. Linear-log: Y = b₀ + b₁ln(X). Log-log: Both logged"
            ]
          }
        ]
      },
      {
        id: "fra",
        name: "Financial Reporting & Analysis",
        category: "Group 1",
        difficulty: "tough",
        summary: "Financial statements, accrual accounting, income statement, balance sheet, cash flows",
        modules: [
          {
            id: "fra-pre",
            title: "Prerequisite: Accounting Fundamentals",
            notes: [
              "Business activities: Operating (day-to-day), Investing (long-term assets), Financing (capital)",
              "Accounting equation: Assets = Liabilities + Equity",
              "Retained Earnings (End) = Retained Earnings (Beginning) + Net Income − Dividends",
              "Accrual accounting: revenue recognized when earned, expenses when incurred — regardless of cash",
              "Unearned revenue: cash received before delivery (liability). Accrued revenue: earned but not yet received (asset)",
              "Prepaid expense: cash paid before recognizing expense (asset). Accrued expense: incurred but not paid (liability)",
              "Debit = LHS (increases assets, decreases liabilities/equity). Credit = RHS"
            ]
          },
          {
            id: "fra-1",
            title: "Module 1: Introduction to Financial Reporting",
            notes: [
              "Financial statements are almost always audited by independent accountants",
              "Income statement: Revenue − Expenses = Net income ('bottom line')",
              "OCI (Other Comprehensive Income): items affecting equity but not through net income — e.g. FX translation, pension adjustments, unrealized gains on hedges",
              "Operating profit = EBIT. Operating → EBT → EAT sequence",
              "Statement of changes in equity shows movements in paid-in capital and retained earnings",
              "Cash flow: Operating (day-to-day), Investing (asset acquisition/disposal), Financing (capital)"
            ]
          },
          {
            id: "fra-2",
            title: "Module 2: Financial Reporting Standards",
            notes: [
              "Two major standard-setting bodies: IASB (international) and FASB (US)",
              "Standard-setters set standards; regulatory authorities (SEC, IOSCO) enforce them",
              "IOSCO: Ordinary members (voting, SEC-level authority), Associate (supranational), Affiliate (exchanges)",
              "Sarbanes-Oxley 2002: created PCAOB, required management commentary on internal controls",
              "Key SEC forms: 10-K (annual US), 20-F (annual foreign), 10-Q (quarterly), 8-K (material events)",
              "IFRS measurement bases: historical cost, amortized cost, current cost, realizable value, PV, fair value"
            ]
          },
          {
            id: "fra-3",
            title: "Module 3: Income Statements",
            notes: [
              "Revenue recognition 5-step model: identify contract → identify obligations → determine price → allocate → recognize",
              "Matching principle: expenses recognized when associated revenues recognized (COGS vs. period costs)",
              "LIFO permitted under US GAAP but not IFRS",
              "Accelerated depreciation: greater proportion of cost in early years",
              "Diluted EPS: if-converted method for convertibles, treasury stock method for options/warrants",
              "Antidilutive securities excluded from diluted EPS calculation"
            ]
          },
          {
            id: "fra-4",
            title: "Module 4: Balance Sheets",
            notes: [
              "Working capital = Current assets − Current liabilities",
              "Under IFRS: R&D split — research expensed, development capitalized",
              "Under US GAAP: most internally developed intangibles expensed immediately",
              "Goodwill = purchase price − fair value of net identifiable assets. Not amortized; tested annually for impairment",
              "Deferred tax assets: taxes paid in advance. Deferred tax liabilities: taxes owed in future"
            ]
          },
          {
            id: "fra-5",
            title: "Module 5: Cash Flow Statements",
            notes: [
              "Direct method: shows specific cash inflows and outflows (eliminates accruals)",
              "Indirect method: starts with net income, adjusts for non-cash items and working capital changes",
              "Under IFRS: interest/dividends can be operating or investing. Under US GAAP: interest paid = operating; dividends paid = financing",
              "Beginning AR + Revenue − Cash from customers = Ending AR",
              "Beginning Inventory + Purchases − COGS = Ending Inventory"
            ]
          }
        ]
      },
      {
        id: "fixed-income",
        name: "Fixed Income",
        category: "Group 2",
        difficulty: "tough",
        summary: "Bond features, valuation, yield measures, ABS, duration, credit analysis",
        modules: [
          {
            id: "fi-1",
            title: "Module 1: Basic Bond Features",
            notes: [
              "Bond issuers: supranational, sovereign, non-sovereign, quasi-government, corporate, SPEs",
              "Coupon rate × par value = coupon. Zero-coupon bonds issued at discount, redeemed at par",
              "Floating rate: MRR + spread. Spread set at issuance based on creditworthiness",
              "YTM: IRR on cash flows assuming held to maturity with coupons reinvested at YTM",
              "Callable: issuer right to redeem early (protects against rate decline). Puttable: investor right to sell back",
              "Conversion value = stock price × conversion ratio. Market conversion premium = market conversion price − stock price"
            ]
          },
          {
            id: "fi-3",
            title: "Module 3: Fixed Income Valuation",
            notes: [
              "Bond price = PV of all future cash flows discounted at market discount rate",
              "Bond prices move inversely to market discount rates",
              "Convexity effect: % price increase > % price decrease for same rate change magnitude",
              "Maturity effect: longer maturity = greater % price change for same rate change",
              "Pull to par: bond price moves toward par as maturity approaches",
              "Spot rates = YTM on zero-coupon bonds. Par curve = yield where bond priced at par",
              "Implied forward rate $f_{A,B-A}$ solves $(1 + Z_B)^B = (1 + Z_A)^A × (1 + f_{A,B-A})^{B-A}$",
              "OAS = Z-spread − option value. Higher OAS = potentially underpriced bond"
            ]
          },
          {
            id: "fi-5",
            title: "Module 5: Risk and Return",
            notes: [
              "Three sources of return: coupon, reinvestment of coupons, capital gain/loss on sale",
              "Macaulay duration = weighted average time to receive bond's cash flows",
              "Modified duration = Macaulay duration / (1 + periodic yield). Estimates % price change per yield change",
              "Duration-convexity approximation: %ΔPV ≈ −\\text{AnnModDur} × Δy + \\frac{1}{2}\\text{AnnConvexity}(Δy)^2",
              "Effective duration: used for bonds with embedded options (not modified duration)",
              "Duration gap = Macaulay duration − investment horizon. Positive gap = price risk dominates; negative = reinvestment risk dominates",
              "Money duration = AnnModDur × PV. PVBP = change in full price per 1bp yield change"
            ]
          },
          {
            id: "fi-6",
            title: "Module 6: Credit Analysis",
            notes: [
              "Expected Loss = Default Probability × Loss Severity Given Default",
              "Loss Severity = 1 − Recovery Rate",
              "Credit rating agencies: Moody's, S&P, Fitch. Investment grade: Baa3 or higher (Moody's) and BBB− or higher (S&P/Fitch)",
              "Secured debt: direct claim on assets. Unsecured: general claim on assets/cash flows",
              "Seniority ranking matters in default: senior secured → junior secured → unsecured → subordinated"
            ]
          }
        ]
      },
      {
        id: "equity",
        name: "Equity Investments",
        category: "Group 2",
        difficulty: "medium",
        summary: "Equity securities, market structure, market efficiency, valuation tools",
        modules: [
          {
            id: "eq-1",
            title: "Module 4: Overview of Equity Securities",
            notes: [
              "Statutory voting: one share = one vote. Cumulative voting: concentrate all votes on one candidate",
              "Preference shares: rank above common for dividends and liquidation; typically no voting rights",
              "Cumulative preference: unpaid dividends accrue and must be paid before common dividends",
              "ADR: US dollar-denominated security trading on US exchanges. GDR: issued outside home country and outside US",
              "ROE = Net Income / Average Book Value. Measures management's efficiency in using shareholder capital",
              "P/B ratio = Market price per share / Book value per share"
            ]
          },
          {
            id: "eq-6",
            title: "Module 6: Equity Valuation — Basic Tools",
            notes: [
              "DDM: intrinsic value = PV of all future dividends. Gordon Growth: V₀ = D₁ / (r − g)",
              "FCFE = CFO − FCInv + Net Borrowing. Discount at cost of equity for equity value",
              "Two-stage DDM: high growth period followed by stable perpetual growth",
              "Enterprise Value = Market cap + Preferred + Debt − Cash. EV/EBITDA avoids capital structure differences",
              "CAPM: required return = Rf + β(ERP). Beta = systematic risk relative to market"
            ]
          },
          {
            id: "eq-3",
            title: "Module 3: Market Efficiency",
            notes: [
              "Weak form: prices reflect all past market data. Technical analysis cannot generate excess returns",
              "Semi-strong form: prices reflect all public information. Fundamental analysis cannot generate excess returns",
              "Strong form: prices reflect all public and private information. Even insiders cannot earn abnormal returns",
              "Market anomaly: price change not directly linked to current relevant information",
              "Behavioral finance: anchoring, overconfidence, loss aversion, mental accounting"
            ]
          }
        ]
      },
      {
        id: "derivatives",
        name: "Derivatives",
        category: "Group 2",
        difficulty: "tough",
        summary: "Forward commitments, contingent claims, pricing, valuation, options, swaps",
        modules: [
          {
            id: "der-1",
            title: "Module 1: Derivative Features",
            notes: [
              "Derivative: financial instrument that derives value from performance of an underlying asset",
              "OTC derivatives: flexible, customizable, higher counterparty risk, less liquid",
              "Exchange-traded derivatives (ETD): standardized, lower counterparty risk, more liquid",
              "Stand-alone vs embedded derivatives (e.g. callable bond embeds a call option)"
            ]
          },
          {
            id: "der-4",
            title: "Module 4: Arbitrage, Replication and Cost of Carry",
            notes: [
              "Arbitrage: two conditions — identical assets must trade at same price; known future price must equal discounted spot",
              "Cost of carry: net of costs and benefits of owning underlying for a period",
              "F(T) = [S₀ − PV(I) + PV(C)] × (1 + r)^T where I = income, C = costs",
              "Equity-index forward: F(T) = S_0 × e^{(r − δ)T} — continuous compounding",
              "Convenience yield: non-cash benefit of holding physical commodity vs derivative"
            ]
          },
          {
            id: "der-8",
            title: "Module 8–9: Options and Put-Call Parity",
            notes: [
              "Call option ITM when S > X; put option ITM when S < X",
              "Option value = intrinsic value + time value. Time value is non-negative and declines to zero at maturity",
              "Put-call parity: S₀ + P₀ = C₀ + PV(X). Holds for European options with same strike and expiry",
              "Fiduciary call = long call + risk-free bond paying X at maturity. Protective put = long stock + long put",
              "Higher volatility → higher option premiums (for both calls and puts)"
            ]
          },
          {
            id: "der-10",
            title: "Module 10: Binomial Option Pricing",
            notes: [
              "One-period binomial: asset moves up to S⁺ or down to S⁻; valuation uses the risk-neutral probability π, which is not necessarily 50%",
              "Hedge ratio h = (C⁺ − C⁻) / (S⁺ − S⁻). Sell 1 call, buy h shares to create riskless portfolio",
              "Risk-neutral probability: π = \\frac{(1 + r) − d}{u − d}",
              "Option price = [π × C⁺ + (1−π) × C⁻] / (1+r)"
            ]
          }
        ]
      },
      {
        id: "alternatives",
        name: "Alternative Investments",
        category: "Group 2",
        difficulty: "medium",
        summary: "Private capital, real estate, infrastructure, commodities, hedge funds",
        modules: [
          {
            id: "alt-1",
            title: "Module 1: Categories and Compensation",
            notes: [
              "Private capital: PE, VC, private debt (direct lending, mezzanine, venture debt, distressed)",
              "Real assets: real estate, infrastructure, natural resources, commodities, farmland/timberland",
              "Hedge funds: private investment vehicles using flexible mandates, leverage, long/short positions",
              "LP commits capital; GP manages and earns management fee (on committed/AUM) + incentive/performance fee",
              "Hurdle rate: GP earns performance fee only after LPs receive their initial investment plus hurdle return",
              "Catch-up clause: allows GP to receive 100% of distributions above hurdle rate until target split reached",
              "High-water mark: GP must recover previous losses before charging performance fees again",
              "European waterfall: all distributions to LPs until hurdle met before GP participates. American: deal-by-deal"
            ]
          },
          {
            id: "alt-2",
            title: "Module 2: Performance Metrics",
            notes: [
              "Sharpe ratio: (Return − Rf) / Std Dev. Assumes normal distribution — flawed for alternatives",
              "Sortino ratio: uses downside deviation instead of std dev — better for skewed returns",
              "Calmar ratio: avg annual return / max drawdown. Recalibrated every 3 years",
              "MOIC = Total Value / Invested Capital",
              "Cap rate = NOI / Property Value. Ignores current property value changes",
              "J-curve: early negative cash flow due to fees and investments before returns materialize",
              "Survivorship bias: databases only include surviving funds — overstates returns",
              "Backfill bias: successful funds added retroactively — overstates historical performance"
            ]
          }
        ]
      },
      {
        id: "corporate-issuers",
        name: "Corporate Issuers",
        category: "Group 1",
        difficulty: "medium",
        summary: "Corporate structures, governance, capital investments, WACC, capital structure, leverage",
        modules: [
          {
            id: "ci-6",
            title: "Module 6: Cost of Capital",
            notes: [
              "Weighted average cost of capital: $\\text{WACC} = w_d × r_d(1 − T) + w_e × r_e + w_p × r_p$",
              "Cost of debt = YTM of existing debt or comparable bonds",
              "Cost of equity via CAPM: re = rf + β × ERP",
              "Blume-adjusted beta: β_a = (2/3)β_u + (1/3)(1.0) — regresses toward 1 over time",
              "For private companies: unlever beta of comparable public companies, then relever at target capital structure",
              "Flotation costs: better to adjust initial cash flow than add to cost of equity"
            ]
          },
          {
            id: "ci-7",
            title: "Module 7: Capital Structure",
            notes: [
              "MM Proposition I (no taxes): capital structure irrelevant — firm value unchanged by financing mix",
              "MM Proposition II (no taxes): cost of equity increases linearly with D/E ratio",
              "MM with taxes: V_L = V_U + tD. Tax shield on debt increases levered firm value",
              "Static trade-off theory: optimal structure balances tax shield of debt vs. cost of financial distress",
              "Pecking order theory: firms prefer internal financing first, then debt, then equity (least preferred)"
            ]
          },
          {
            id: "ci-8",
            title: "Module 8: Measures of Leverage",
            notes: [
              "Operating leverage: sensitivity of EBIT to revenue change. DOL = Contribution / EBIT",
              "Financial leverage: sensitivity of net income to EBIT change. DFL = EBIT / EBT",
              "Total leverage = DOL × DFL",
              "Higher fixed costs → higher operating leverage → greater business risk",
              "Break-even quantity Q = Fixed Costs / (Price − Variable Cost per unit)"
            ]
          }
        ]
      },
      {
        id: "economics-l1",
        name: "Economics",
        category: "Group 3",
        difficulty: "tough",
        summary: "Supply & demand, firm structure, GDP, business cycles, monetary policy, FX",
        modules: [
          {
            id: "econ-1",
            title: "Module 1: Demand and Supply",
            notes: [
              "Own-price elasticity: absolute value below 1 is inelastic; above 1 is elastic. With elastic demand, price and revenue move in opposite directions",
              "Normal goods: positive income elasticity. Inferior goods: negative income elasticity",
              "Cross-price elasticity positive = substitutes. Negative = complements",
              "Giffen goods and Veblen goods: quantity demanded increases with price (exceptions to law of demand)",
              "Profit maximization: produce where MR = MC and MC is not falling"
            ]
          },
          {
            id: "econ-4",
            title: "Module 4: Business Cycles",
            notes: [
              "5 phases: initial recovery → early expansion → late expansion → slowdown → contraction",
              "Inflation topping out and short-term rates at peak = slowdown phase signal",
              "Laspeyres index: fixed basket (overestimates inflation due to substitution, quality, new product bias)",
              "Core inflation excludes food and energy. Headline includes all goods",
              "NAIRU: non-accelerating inflation rate of unemployment — unemployment below this level raises inflation"
            ]
          },
          {
            id: "econ-8",
            title: "Module 8: Currency Exchange Rates",
            notes: [
              "Real exchange rate: q = S_{d/f} × (P_f / P_d) — adjusts the nominal rate for relative price levels",
              "Covered interest rate parity: no-arbitrage condition linking spot, forward rates and interest rate differentials",
              "Uncovered interest rate parity: expected exchange rate change equals interest rate differential (not arbitrage-enforced)",
              "Forward points = (Forward rate − Spot rate) × the market quotation scale — commonly 10,000 for four-decimal currency quotes",
              "Marshall-Lerner condition: depreciation improves trade balance if sum of export/import elasticities > 1",
              "J-curve effect: trade balance worsens before improving after currency depreciation"
            ]
          }
        ]
      },
      {
        id: "portfolio-mgmt-l1",
        name: "Portfolio Management",
        category: "Group 3",
        difficulty: "medium",
        summary: "Portfolio theory, CAPM, risk and return, IPS, behavioral biases, fintech",
        modules: [
          {
            id: "pm-2",
            title: "Module 2: Portfolio Risk and Return I",
            notes: [
              "Geometric mean return is more accurate for multi-period growth than arithmetic mean",
              "Time-weighted return: eliminates effect of external cash flows. Best for manager evaluation",
              "Money-weighted return: accounts for timing and amount of cash flows. Best for investor perspective",
              "Portfolio variance: $σ_p^2 = w_a^2 σ_a^2 + w_b^2 σ_b^2 + 2 w_a w_b \\, \\mathrm{Cov}(a, b)$",
              "Correlation: $\\rho_{a,b} = \\frac{\\mathrm{Cov}(a, b)}{σ_a σ_b}$ — lower correlation provides greater diversification benefit",
              "Minimum variance frontier: efficient portion above global minimum variance portfolio"
            ]
          },
          {
            id: "pm-3",
            title: "Module 3: Portfolio Risk and Return II",
            notes: [
              "CML = Capital Market Line: combines risk-free asset with market portfolio",
              "SML = Security Market Line: applies to any asset using beta (systematic risk)",
              "CAPM: E(R_i) = R_f + β_i × [E(R_m) − R_f] — beta measures sensitivity to the market",
              "Systematic risk cannot be diversified away — it is priced. Unsystematic risk can be diversified — not priced",
              "Sharpe ratio: (R_p − R_f) / σ_p. Treynor ratio: (R_p − R_f) / β_p. Jensen's alpha: actual return − CAPM-implied return",
              "Fama-French 3-factor: adds size (SMB) and value (HML) factors to CAPM"
            ]
          },
          {
            id: "pm-5",
            title: "Module 5: Behavioral Biases",
            notes: [
              "Cognitive biases: conservatism, confirmation, representativeness, anchoring, mental accounting, framing, availability",
              "Emotional biases: loss aversion, overconfidence, self-control, status quo, endowment, regret aversion",
              "Loss aversion: investors dislike losses approximately 2× more than they like equivalent gains",
              "Hindsight bias: believing past events were predictable after the fact",
              "Cognitive errors can often be corrected with education; emotional biases are harder to overcome"
            ]
          }
        ]
      },
      {
        id: "ethics-l1",
        name: "Ethics & Professional Standards",
        category: "Group 1",
        difficulty: "medium",
        summary: "Code of ethics, 7 standards of professional conduct, GIPS",
        modules: [
          {
            id: "eth-1",
            title: "Standards Overview",
            notes: [
              "Standard I: Professionalism — Knowledge of Law, Independence & Objectivity, Misrepresentation, Misconduct",
              "Standard II: Integrity of Capital Markets — MNPI (Mosaic Theory), Market Manipulation",
              "Standard III: Duties to Clients — Loyalty/Prudence/Care, Fair Dealing, Suitability, Performance Presentation, Confidentiality",
              "Standard IV: Duties to Employers — Loyalty, Additional Compensation Arrangements, Supervisory Responsibilities",
              "Standard V: Investment Analysis — Diligence & Reasonable Basis, Communication with Clients, Record Retention",
              "Standard VI: Conflicts of Interest — Disclose Conflicts, Priority of Transactions (Client > Employer > Self), Referral Fees",
              "Standard VII: CFA Responsibilities — Conduct as Candidate/Member, Reference to CFA Designation",
              "In conflict of laws: comply with the more strict law or regulation"
            ]
          },
          {
            id: "eth-gips",
            title: "GIPS",
            notes: [
              "GIPS compliance is voluntary — not legally required",
              "Composite: aggregation of portfolios managed under a similar mandate or strategy",
              "Non-discretionary portfolios must not be included in composites",
              "Verification: independent firm tests on a firm-wide basis — not individual composites"
            ]
          }
        ]
      }
    ]
  },

  L2: {
    label: "Level 2",
    status: "passed",
    passDate: "2025",
    topics: [
      {
        id: "quant-l2",
        name: "Quantitative Methods",
        category: "Difficult",
        difficulty: "tough",
        summary: "Multiple regression, time series, machine learning, big data",
        modules: [
          {
            id: "l2-qm-1",
            title: "Module 1: Multiple Regression",
            notes: [
              "Multiple regression: Y = b₀ + b₁X₁ + … + bₖXₖ + ε — each bⱼ measures the change in Y per unit change in Xⱼ, holding other variables constant",
              "Adjusted R² penalizes for adding variables without improving fit. AIC (forecast) vs BIC (goodness of fit) — lower is better",
              "Heteroskedasticity: non-constant variance of residuals. Breusch-Pagan test: regress squared residuals on independent variables",
              "Autocorrelation: correlated residuals across observations. Use Durbin-Watson (single lag) or Breusch-Godfrey (multiple lags)",
              "Multicollinearity: VIF > 5 warrants investigation; VIF > 10 indicates severe multicollinearity",
              "Cook's distance > 0.5 warrants inspection for influential observations. Studentized residuals detect outliers",
              "Logistic regression: models probability of binary outcome. Log odds = ln(p/(1−p)). F-test replaced by likelihood ratio test"
            ]
          },
          {
            id: "l2-qm-2",
            title: "Module 2: Time Series Analysis",
            notes: [
              "AR(p) model: xₜ = b₀ + b₁xₜ₋₁ + … + bₚxₜ₋ₚ + εₜ",
              "Covariance stationarity: constant mean, finite variance, autocovariance depends only on lag not time",
              "Log-linear model appropriate for financial time series with exponential growth: ln(y) = b₀ + b₁t",
              "Mean-reversion level: x̄ = b₀ / (1 − b₁) — a random walk has b₁ = 1 and no mean reversion",
              "First differencing transforms random walk into stationary series",
              "Dickey-Fuller test: null hypothesis = unit root (non-stationary). Want to reject",
              "ARCH(1): σ²ₜ = α₀ + α₁ε²ₜ₋₁ — conditional variance depends on the prior squared shock",
              "Cointegration: two non-stationary series share same long-run trend — valid to regress"
            ]
          },
          {
            id: "l2-qm-3",
            title: "Module 3: Machine Learning",
            notes: [
              "Supervised learning: labeled data (regression, classification). Unsupervised: no labels (clustering, PCA)",
              "Bias-variance tradeoff: complex models reduce bias but increase variance (overfitting)",
              "k-fold cross-validation: rotate training and validation sets to reduce overfitting",
              "CART: classification and regression trees. Random forest: ensemble of decision trees — reduces noise",
              "LASSO: penalized regression that can shrink coefficients to zero (feature selection)",
              "PCA: reduces dimensionality. Eigenvectors = factors; eigenvalues = proportion of variance explained",
              "K-means clustering: assign observations to k clusters based on distance to centroid. Iterative until no reassignment"
            ]
          }
        ]
      },
      {
        id: "fra-l2",
        name: "Financial Reporting & Analysis",
        category: "Medium",
        difficulty: "medium",
        summary: "Intercorporate investments, pensions, multinational ops, financial institutions, earnings quality",
        modules: [
          {
            id: "l2-fra-1",
            title: "Module 1: Intercorporate Investments",
            notes: [
              "< 20% ownership: investment in financial assets. 20-50%: associate (equity method). > 50%: subsidiary (acquisition method)",
              "FVPL: fair value on balance sheet; all changes (realized + unrealized) in income statement",
              "FVOCI: fair value on balance sheet; unrealized G/L in OCI. Interest/dividends in income statement",
              "Amortized cost: only for debt. Carries at historical cost adjusted for premium/discount amortization",
              "Equity method: initial investment at cost. Share of profits increase it; dividends reduce it (return of capital)",
              "Full goodwill (US GAAP) = Fair value of entire subsidiary − Fair value of net identifiable assets",
              "Partial goodwill (IFRS) = Purchase price − (% owned × Fair value of net identifiable assets)",
              "Acquisition method: consolidate 100% of assets/liabilities; noncontrolling interest shown in equity"
            ]
          },
          {
            id: "l2-fra-2",
            title: "Module 2: Pensions",
            notes: [
              "Defined contribution: employer contributes fixed amount; employee bears investment risk",
              "Defined benefit: employer bears investment risk; obligation based on salary and years of service",
              "Funded status = Fair value of plan assets − PBO. Negative = liability; positive = asset",
              "PBO changes: +current service cost, +interest cost, +past service cost, +actuarial losses, −benefits paid",
              "Under IFRS: past service cost expensed immediately in P&L. Under GAAP: amortized via corridor approach",
              "Net interest cost (IFRS) = Discount rate × Beginning funded status",
              "Corridor approach (GAAP): amortize actuarial gains/losses only when they exceed 10% of greater of plan assets or beginning PBO"
            ]
          },
          {
            id: "l2-fra-3",
            title: "Module 3: Multinational Operations",
            notes: [
              "Current rate method (translation): BS at current rate; IS at average rate; equity at historical. G/L in OCI (CTA)",
              "Temporal method (remeasurement): monetary items at current rate; non-monetary at historical. G/L in income statement",
              "If functional = local currency → use current rate method. If functional ≠ local → use temporal first",
              "Hyperinflation (GAAP): treat functional = reporting; use temporal method. IFRS: restate for inflation then translate at current rate",
              "Depreciating foreign currency: translated mixed ratios (IS/BS) will be larger under current rate method"
            ]
          },
          {
            id: "l2-fra-5",
            title: "Module 5: Earnings Quality",
            notes: [
              "Beneish M-score: 8-factor model for earnings manipulation probability. M > −1.78 = high manipulation risk",
              "Key flags: DSRI (receivables growing faster than revenue), GMI (gross margin deteriorating), AQI (excess capitalization)",
              "Operating accruals: NI − CFO",
              "High accruals relative to assets = lower earnings persistence and quality",
              "Altman Z-score: predicts bankruptcy using 5 accounting/market variables. Higher = lower bankruptcy risk",
              "Revenue manipulation signs: receivables growing faster than revenue, high rate of customer returns, Q4 revenue spikes"
            ]
          }
        ]
      },
      {
        id: "fixed-income-l2",
        name: "Fixed Income",
        category: "Difficult",
        difficulty: "tough",
        summary: "Term structure, arbitrage-free valuation, embedded options, credit models, CDS",
        modules: [
          {
            id: "l2-fi-1",
            title: "Module 1: Term Structure Dynamics",
            notes: [
              "Spot rate = YTM on zero-coupon bond. Forward rate = implied rate between two spot rates",
              "Forward-rate relation: (1 + Z_A)^A × (1 + f_{A,B-A})^(B-A) = (1 + Z_B)^B — an upward-sloping spot curve generally implies forward rates above spot rates",
              "Par curve: yields at which bonds are priced at par. Bootstrapping derives spot rates from par yields",
              "Swap rate curve used as benchmark; swap spread = fixed rate on swap − government bond yield of same maturity",
              "Z-spread: constant spread over all spot rates to price bond. OAS = Z-spread − option cost",
              "Pure expectations theory: forward rates are unbiased predictors of future spot rates",
              "Liquidity preference theory: forward rates = expected spot rates + liquidity premium (positive for longer maturities)"
            ]
          },
          {
            id: "l2-fi-2",
            title: "Module 2: Arbitrage-Free Valuation",
            notes: [
              "Adjacent rates in a binomial interest-rate tree: $r_{\\text{high}} = r_{\\text{low}} × e^{2σ}$",
              "Backward induction: $V_{\\text{node}} = \\frac{0.5(V_{\\text{up}} + V_{\\text{down}}) + C}{1 + r_{\\text{node}}}$ — C is the coupon paid at the next node",
              "Pathwise valuation: average the present value across all $2^{n-1}$ possible paths",
              "Tree is calibrated to match observed market prices (arbitrage-free)",
              "Vasicek model: allows negative rates; mean-reverting. CIR model: volatility scales with rate level",
              "Ho-Lee: arbitrage-free with time-varying drift. KWF: lognormal, arbitrage-free, no mean reversion"
            ]
          },
          {
            id: "l2-fi-3",
            title: "Module 3: Bonds with Embedded Options",
            notes: [
              "Callable bond: $V_{\\text{callable}} = V_{\\text{straight}} − V_{\\text{call}}$ — the issuer holds the call",
              "Putable bond: $V_{\\text{putable}} = V_{\\text{straight}} + V_{\\text{put}}$ — the investor holds the put",
              "Effective duration = (V₋ − V₊) / (2 × V₀ × Δy). Used because callable bonds lack well-defined YTM",
              "Negative convexity for callable bonds when rates fall (call caps price appreciation)",
              "OAS increases with IR volatility for putable bonds (investor is long volatility). Decreases for callable bonds",
              "Convertible bond minimum value = max(conversion value, straight value)",
              "Market conversion premium = market conversion price − stock price. Positive premium = paying up for optionality"
            ]
          },
          {
            id: "l2-fi-4",
            title: "Module 4: Credit Analysis Models",
            notes: [
              "CVA = Price of riskless bond − Price of risky bond = PV of expected losses",
              "Expected Loss = Exposure × Probability of Default × Loss Severity",
              "Hazard rate: conditional probability of default given survival to that point",
              "Structural model: default when asset value falls below debt value. Equity = call on assets",
              "Reduced-form model: default is exogenous; modelled statistically using hazard rate",
              "Risk-neutral default probability from the credit spread, assuming zero recovery: $(1 − p)(1 + y_{\\text{risky}}) = 1 + y_{\\text{risk-free}}$"
            ]
          },
          {
            id: "l2-fi-5",
            title: "Module 5: Credit Default Swaps",
            notes: [
              "CDS buyer pays periodic premium (spread) to seller; receives payment if credit event occurs",
              "Credit events: bankruptcy, failure to pay, restructuring",
              "CDS spread ≈ (1 − R) × PD — a rough approximation that ignores timing and discounting",
              "Upfront premium % = (CDS spread − standard coupon) × Duration",
              "Index CDS: covers multiple issuers; correlation among issuers affects spread",
              "Naked CDS: takes credit risk without holding underlying bond (speculative)",
              "Basis trade: buy bond + buy CDS to lock in spread difference between bond and CDS markets"
            ]
          }
        ]
      },
      {
        id: "equity-l2",
        name: "Equity",
        category: "Easy",
        difficulty: "easy",
        summary: "Equity valuation: DDM, FCF, multiples, residual income, private company valuation",
        modules: [
          {
            id: "l2-eq-2",
            title: "Module 2: Discounted Dividend Valuation",
            notes: [
              "Gordon Growth Model: V₀ = D₁ / (r − g); g = ROE × b — b is the retention ratio",
              "H-Model: V₀ = [D₀(1+gL) / (r−gL)] + [D₀ × H × (gS−gL) / (r−gL)]",
              "Present value of growth opportunities: $\\text{PVGO} = V_0 − E_1 / r$ — positive when ROE exceeds the required return on equity",
              "Justified leading P/E = (1−b) / (r−g). Justified trailing P/E = (1−b)(1+g) / (r−g)",
              "Sustainable growth rate g = ROE × retention ratio. Use DuPont to decompose ROE drivers"
            ]
          },
          {
            id: "l2-eq-3",
            title: "Module 3: Free Cash Flow Valuation",
            notes: [
              "FCFF = NI + NCC + Int(1−t) − FCInv − WCInv. Discount at WACC for firm value",
              "FCFE = FCFF − Int(1−t) + Net Borrowing. Discount at re for equity value",
              "FCFE = NI − (1−DR)(FCInv − Dep) − (1−DR)(WCInv). DR = debt ratio",
              "FCInv = Ending Net PP&E − Beginning Net PP&E + Depreciation",
              "WCInv = ΔCurrent Assets (ex-cash) − ΔCurrent Liabilities (ex-debt)"
            ]
          },
          {
            id: "l2-eq-4",
            title: "Module 4: Market-Based Valuation",
            notes: [
              "P/E: sensitive to accounting choices; meaningless when negative. Use normalized EPS for cyclical firms",
              "P/B: useful for financial firms and distressed companies. Adjusted to remove goodwill for comparability",
              "P/S: useful for distressed/startup firms; doesn't capture cost structure differences",
              "EV/EBITDA: preferred for capital-intensive firms; removes capital structure differences",
              "PEG ratio = (P/E) / g. Lower PEG = cheaper relative to growth. Ignores risk",
              "Molodovsky effect: P/E high at business cycle trough, low at peak — earnings lead price"
            ]
          },
          {
            id: "l2-eq-5",
            title: "Module 5: Residual Income Valuation",
            notes: [
              "RI = Net Income − (re × Beginning Book Value). Captures profit above cost of equity",
              "EVA = NOPAT − (WACC × Invested Capital). Measures true economic value added",
              "Residual income valuation: V₀ = B₀ + \\sum_{t=1}^{\\infty} [RI_t / (1 + r)^t] — terminal value may assume RI fades at persistence factor ω",
              "RI recognized earlier than dividends — less dependent on uncertain terminal value",
              "Clean surplus violated when items bypass income statement (FX translation, pension adjustments, OCI items)",
              "Justified P/B = 1 + PV of future RI / Book Value. P/B > 1 when ROE > cost of equity"
            ]
          },
          {
            id: "l2-eq-6",
            title: "Module 6: Private Company Valuation",
            notes: [
              "Private company discounts: DLOC (lack of control) and DLOM (lack of marketability) — applied sequentially",
              "Total discount = 1 − [(1−DLOC)(1−DLOM)]",
              "GPCM: use public company multiples + control premium. GTM: use actual transaction multiples (already include control premium)",
              "Normalized earnings: remove non-recurring items, owner compensation adjustments, personal expenses",
              "Income approach: DCF. Market approach: comparables. Asset-based: for holding companies or near-liquidation",
              "Capitalized Cash Flow Method: V = NCF / Capitalization Rate. Cap rate = WACC − long-term growth rate"
            ]
          }
        ]
      },
      {
        id: "derivatives-l2",
        name: "Derivatives",
        category: "Difficult",
        difficulty: "tough",
        summary: "Forward commitments pricing, contingent claims valuation, Black-Scholes, Greeks",
        modules: [
          {
            id: "l2-der-1",
            title: "Module 1: Pricing Forward Commitments",
            notes: [
              "Forward price with no income or storage costs: $F(T) = S_0(1 + r)^T$ — subtract the PV of income and add the PV of costs",
              "Equity with dividends: F(T) = (S₀ − PV(D)) × (1+r)^T",
              "Equity-index forward: $F(T) = S_0 e^{(r − δ)T}$, where $δ$ is the continuous dividend yield",
              "FRA pricing: lock-in rate that equates lending through full period to rolling two shorter periods",
              "Bond futures: quoted (clean) price × CF + accrued interest at delivery = full price received by short",
              "CTD bond: short selects bond with lowest basis = (Spot − Futures × CF) to deliver"
            ]
          },
          {
            id: "l2-der-2",
            title: "Module 2: Contingent Claims Valuation",
            notes: [
              "Black-Scholes: C = S₀N(d₁) − Xe^(−rT)N(d₂) — assumes continuous trading, no dividends, and constant volatility",
              "Black-Scholes terms: d₁ = [ln(S/X) + (r + 0.5σ²)T] / (σ√T); d₂ = d₁ − σ√T",
              "N(d₁) = delta of call option. N(−d₁) = delta of put option (positive, but position is negative)",
              "Delta: rate of change of option price per unit change in underlying. Ranges 0 to 1 for calls",
              "Gamma: rate of change of delta. Highest ATM and near expiry. Positive for long positions",
              "Vega: sensitivity to volatility. Positive for long calls and puts. Higher further from expiry",
              "Implied volatility: volatility backed out from market option price using BSM. Skew = OTM puts priced higher",
              "Binomial model converges to BSM as time steps increase and step size decreases"
            ]
          }
        ]
      },
      {
        id: "portfolio-l2",
        name: "Portfolio Management",
        category: "Medium",
        difficulty: "medium",
        summary: "ETFs, multifactor models, VaR, backtesting, economics and markets, active management",
        modules: [
          {
            id: "l2-pm-2",
            title: "Module 2: Multifactor Models",
            notes: [
              "APT: E(R_i) = R_f + \\sum_{j=1}^{k} [β_j × RP_j] — allows multiple priced factors",
              "Fama-French 3-factor: market (ERP) + size (SMB) + value (HML)",
              "Carhart 4-factor: adds momentum (WML) to Fama-French",
              "Active return = portfolio return − benchmark return = factor return + security selection return",
              "Information ratio = mean active return / tracking error. Unaffected by leverage unlike Sharpe",
              "IR = IC × √BR. IC = information coefficient (skill). BR = number of independent bets (breadth)"
            ]
          },
          {
            id: "l2-pm-3",
            title: "Module 3: Market Risk (VaR)",
            notes: [
              "VaR is the loss threshold that should not be exceeded at a stated confidence level over a specified period; it is not expected loss",
              "Parametric VaR for normally distributed returns: VaR_α = z_α × σ − μ",
              "Historical simulation: rank actual returns; 5th percentile = 95% VaR",
              "CVaR (Expected Shortfall): expected loss given that loss exceeds VaR threshold",
              "IVaR: absolute change in portfolio VaR from changing one position",
              "Marginal VaR: change in portfolio VaR per 1% change in portfolio weight of an asset",
              "Limitations: underestimates tail risk, assumes normal distribution, correlation instability in stress periods"
            ]
          },
          {
            id: "l2-pm-6",
            title: "Module 6: Active Portfolio Management",
            notes: [
              "Fundamental Law of Active Management: IR = TC × IC × √BR",
              "TC (transfer coefficient): correlation between desired and actual active weights. = 1 for unconstrained",
              "Optimal active risk: σ_A* = (IR*/SR_B) × σ_B",
              "Sharpe of combination: SR² = SR_B² + IR²",
              "Market-timing information coefficient: IC = 2p − 1 — p is the fraction of correct calls and must exceed 0.5 to add value",
              "Active weights sum to zero. Overweighted = positive active weight; underweighted = negative"
            ]
          }
        ]
      },
      {
        id: "economics-l2",
        name: "Economics",
        category: "Difficult",
        difficulty: "tough",
        summary: "Currency equilibrium, economic growth models, convergence theories",
        modules: [
          {
            id: "l2-econ-1",
            title: "Module 1: FX Equilibrium Value",
            notes: [
              "FX carry trade: borrow low-rate currency, invest in high-rate currency. Bet against UIP",
              "Mundell-Fleming: high capital mobility — expansionary monetary = currency depreciation; expansionary fiscal = appreciation",
              "Low capital mobility — both expansionary monetary and fiscal lead to depreciation (trade channel dominates)",
              "Portfolio balance approach: fiscal deficits increase sovereign debt; currency may depreciate as risk premiums rise",
              "Currency crisis signs: high inflation, deteriorating exports, declining FX reserves",
              "Dornbusch overshooting: exchange rate reacts more than PPP suggests in short run; reverts over time"
            ]
          },
          {
            id: "l2-econ-2",
            title: "Module 2: Economic Growth",
            notes: [
              "Cobb-Douglas: Y = T × K^α × L^(1−α). α = capital's share of output",
              "Solow growth accounting: ΔY/Y = ΔTFP/TFP + α(ΔK/K) + (1 − α)(ΔL/L)",
              "Neoclassical steady-state per-capita output growth: g_y^* = g_{TFP} / (1 − α) — capital deepening affects transition, not long-run growth",
              "Endogenous growth: returns to capital are constant → increased savings permanently raises growth rate",
              "Absolute convergence: all countries converge to same growth rate. Conditional: convergence only with same fundamentals",
              "Dutch Disease: natural resource abundance causes currency appreciation, crowding out manufacturing"
            ]
          }
        ]
      },
      {
        id: "corporate-finance-l2",
        name: "Corporate Finance",
        category: "Easy",
        difficulty: "easy",
        summary: "Dividends, share repurchases, ESG, advanced cost of capital, restructuring",
        modules: [
          {
            id: "l2-cf-1",
            title: "Module 1: Dividends and Share Repurchases",
            notes: [
              "MM dividend irrelevance: in perfect markets, payout policy doesn't affect firm value",
              "Bird-in-hand theory: investors prefer dividends now over uncertain future capital gains",
              "Target payout model: Expected dividend increase = [(E × target payout) − prev. dividend] × adjustment factor",
              "Buybacks: increase EPS if earnings yield > after-tax cost of debt used to finance repurchase",
              "BVPS decreases if repurchase price > pre-repurchase BVPS (paying above book destroys book value per share)",
              "5 advantages of repurchases over dividends: tax, signaling, flexibility, offset option dilution, change leverage"
            ]
          },
          {
            id: "l2-cf-4",
            title: "Module 4: Corporate Restructuring",
            notes: [
              "Synergies: cost (economies of scale, eliminate redundancy) and revenue (cross-selling, economies of scope)",
              "Transaction types: Investments (equity, JV, acquisition), Divestments (sale, spin-off), Restructuring (cost, balance sheet, reorg)",
              "Spin-off: new independent legal entity; shares distributed to existing shareholders; no cash raised",
              "Sale-leaseback: sell asset then lease it back. Immediate cash infusion; converts illiquid asset to liquid",
              "Dividend recapitalization: new debt issued to fund large dividend. Increases leverage, reduces WACC (if beneficial)",
              "GPCM: public company multiples + control premium. GTM: transaction multiples (already include premium)"
            ]
          }
        ]
      },
      {
        id: "alternatives-l2",
        name: "Alternative Investments",
        category: "Medium",
        difficulty: "medium",
        summary: "Real estate valuation, commodities and commodity derivatives",
        modules: [
          {
            id: "l2-alt-1",
            title: "Module 1: Real Estate",
            notes: [
              "NOI = Potential Gross Income − Vacancy & Collection Loss − Operating Expenses",
              "Direct capitalization: Value = NOI₁ / Cap Rate. Cap rate = discount rate − NOI growth rate",
              "DSCR = NOI / Debt Service. LTV = Loan Amount / Appraised Value",
              "REIT: distributes ≥ 90% of taxable income; avoids double taxation. FFO = NI + D&A − gains on sales",
              "AFFO = FFO − non-cash rent − recurring maintenance capex. Better proxy for cash available for distribution",
              "Repeat-sales index (transaction-based) vs appraisal-based index (smoothed, lagged, biased correlations downward)"
            ]
          },
          {
            id: "l2-alt-2",
            title: "Module 2: Commodities",
            notes: [
              "Commodity return components: spot (price) return + roll return + collateral return",
              "Contango: futures > spot (negative basis, negative roll yield for long). Backwardation: futures < spot (positive roll yield)",
              "Futures price ≈ Spot × (1+r) + Storage Costs − Convenience Yield",
              "Roll yield: earned when rolling from expiring to new contract. Positive in backwardation, negative in contango",
              "Carry trade in commodities: convenience yield and storage costs determine forward curve shape",
              "Commodity sectors: Energy (largest), Industrial Metals, Grains, Livestock, Precious Metals, Softs"
            ]
          }
        ]
      },
      {
        id: "ethics-l2",
        name: "Ethics",
        category: "Easy",
        difficulty: "easy",
        summary: "Application of CFA Institute Code and Standards across real-world scenarios",
        modules: [
          {
            id: "l2-eth-1",
            title: "Code Application",
            notes: [
              "Mosaic Theory: combining material public info + nonmaterial nonpublic info is permissible — conclusions become material only when assembled",
              "Suitability: assess client risk profile and constraints before any recommendation. Reassess regularly",
              "Fair dealing: disseminate recommendations to all clients simultaneously or in a systematic way",
              "Performance Presentation: fair, accurate, complete — cannot cherry-pick time periods or portfolios",
              "Supervisors must establish and enforce compliance systems — cannot delegate away responsibility",
              "Referral fees: must disclose to employer, clients and prospective clients. Full disclosure required"
            ]
          }
        ]
      }
    ]
  },

  L3: {
    label: "Level 3",
    status: "in_progress",
    passDate: null,
    topics: [
      {
        id: "asset-allocation-l3",
        name: "Asset Allocation",
        category: "Core",
        difficulty: "tough",
        summary: "CME framework, forecasting returns, MVO, liability-relative, goals-based, real-world constraints",
        modules: [
          {
            id: "l3-aa-1",
            title: "Module 1: CME Framework & Macro",
            notes: [
              "Capital market expectations must be cross-sectionally consistent (across assets at a point in time) and temporally consistent (across time horizons)",
              "7-step CME process: determine scope → research history → specify methods → identify data sources → interpret environment → formulate expectations → monitor and provide feedback",
              "Exogenous shocks: policy changes, political events, technology, natural disasters, financial crises",
              "Taylor Rule: i^* = r^* + π + 0.5(y − y^*) + 0.5(π − π^*) — y − y* is the percentage output gap",
              "Fiscal + monetary both expansionary with high capital mobility: ambiguous FX impact. Low mobility: depreciation",
              "Anchoring, status quo, confirmation, overconfidence, prudence and availability biases are key CME pitfalls"
            ]
          },
          {
            id: "l3-aa-2",
            title: "Module 2: Forecasting Asset Class Returns",
            notes: [
              "Grinold-Kroner: E(R_e) = D/P + %ΔE − %ΔS + %Δ(P/E) — long-run share issuance and valuation changes often approach zero",
              "Singer-Terhaar: blends fully integrated CAPM and fully segmented CAPM by degree of integration",
              "Singer-Terhaar integrated premium: RP_i = ρ_{i,g} × σ_i × SR_g",
              "Singer-Terhaar blended premium: $RP_i = \\lambda × RP_{\\text{integrated}} + (1 − \\lambda) × RP_{\\text{segmented}}$",
              "Expected real-estate return: $E(R_{\\text{RE}}) ≈ \\text{Cap rate} + \\text{NOI growth} − %\\Delta \\text{Cap rate}$",
              "Emerging market bond risks: concentrated wealth, foreign currency borrowing, volatile capital flows, limited fiscal strength",
              "VCV shrinkage: blend sample VCV with target matrix. Weights depend on confidence in historical data",
              "Smoothed data underestimates risk and overstates diversification — must unsmooth for alternatives (RE, PE)"
            ]
          },
          {
            id: "l3-aa-3",
            title: "Module 3: Overview of Asset Allocation",
            notes: [
              "Economic balance sheet includes financial assets + extended assets (human capital, PV of pension) + liabilities",
              "3 approaches: asset-only (MVO), liability-relative (surplus optimization), goals-based (subportfolios per goal)",
              "Global market portfolio: starting point for strategic asset allocation before applying investor-specific constraints",
              "SAA requires IPS, simulation over investment horizon, and comparative risk-return analysis before approval",
              "Rebalancing triggers: calendar (time-based) vs percentage-range (value-based). Higher txn costs → wider corridors",
              "Corridor width factors: txn costs (+wider), risk tolerance (+wider), correlation (+wider), volatility (−narrower), liquidity (−narrower)"
            ]
          },
          {
            id: "l3-aa-4",
            title: "Module 4: Principles of Asset Allocation",
            notes: [
              "Mean-variance utility with percentage returns: U_m = E(R_m) − 0.005 × λ_m × Var(R_m) — use 0.5 instead of 0.005 when returns are decimals",
              "Drawbacks of MVO: GIGO (input sensitivity), concentrated allocations, ignores skew/kurtosis, single-period, illiquid assets",
              "Reverse optimization: start from market-cap weights → derive implied returns. Used in Black-Litterman",
              "Resampled MVO: Monte Carlo simulations around inputs → average frontier portfolios per risk level",
              "Marginal contribution to total risk: $\\text{MCTR}_i = β_{i,p} × σ_p$",
              "Absolute contribution to total risk: $\\text{ACTR}_i = w_i × \\text{MCTR}_i$",
              "Optimal risk budgeting equates expected excess return per unit of MCTR across assets",
              "Liability-relative surplus return: R_s = (ΔA − ΔL) / A — maximize the surplus Sharpe ratio",
              "Two-portfolio approach: hedge portfolio (immunizes liabilities) + return-seeking portfolio (managed independently)",
              "Goals-based: each goal gets its own subportfolio with min prob of success and time horizon"
            ]
          },
          {
            id: "l3-aa-5",
            title: "Module 5: Real-World Constraints",
            notes: [
              "Large funds: economies of scale, lower cost internal management, greater fee negotiation power",
              "Small funds: use pooled/commingled accounts for required diversification",
              "Insurance: fixed income dominates; book value accounting reduces focus on market volatility",
              "Pension: allocation cap constraints; incentivized to invest domestically; fund contributions minimize",
              "After-tax allowed deviation: $d_{\\text{after-tax}} = d_{\\text{before-tax}} × (1 − T)$ — taxes reduce return volatility",
              "Tax loss harvesting: deliberately realize losses to offset gains. Strategic asset location: highest-taxed assets in tax-advantaged accounts",
              "TAA uses: macroeconomic indicators, fundamental (P/E vs historical), sentiment (margin borrowing, short interest, VIX)",
              "Behavioral biases in asset allocation: loss aversion → goals-based solution. Home bias → use global market portfolio as anchor"
            ]
          }
        ]
      },
      {
        id: "derivatives-rm-l3",
        name: "Derivatives & Risk Management",
        category: "Core",
        difficulty: "tough",
        summary: "Options strategies, interest rate/equity/currency swaps and futures, currency management",
        modules: [
          {
            id: "l3-der-1",
            title: "Module 1: Options Strategies",
            notes: [
              "Covered call: long underlying + short call. Limits upside; reduces cost basis. Use when expecting limited upside",
              "Protective put: long underlying + long put. Insurance against downside. Retains upside",
              "Collar = protective put + covered call. Reduces cost vs. pure protective put but caps upside",
              "Bull call spread: long low-strike call + short high-strike call. Debit spread. Profits from moderate upside",
              "Straddle: long call + long put at same strike. Profits from high volatility (direction agnostic)",
              "Calendar spread: sell near-term option + buy far-term option. Profits from theta decay and stable price",
              "Delta: call delta ∈ [0,1]. Put delta ∈ [−1,0]. Position delta = sum of individual deltas weighted by position size",
              "Implied volatility skew: OTM puts command higher IV than OTM calls — reflect crash risk premium"
            ]
          },
          {
            id: "l3-der-2",
            title: "Module 2: Swaps, Forwards and Futures",
            notes: [
              "Payer swap: pay fixed, receive floating. Economically = short fixed bond + long floating bond. Negative duration",
              "Required swap notional: $\\text{NPS} = \\frac{\\text{MD}_{\\text{target}} − \\text{MD}_{\\text{portfolio}}}{\\text{MD}_{\\text{swap}}} × \\text{MV}_{\\text{portfolio}}$",
              "BPV hedge ratio: $N_f = \\frac{\\text{BPV}_{\\text{portfolio}} − \\text{BPV}_{\\text{target}}}{\\text{BPV}_f}$",
              "Basis-point value: BPV = MD × 0.0001 × MV",
              "Equity-futures contracts: $N_f = \\frac{β_T − β_P}{β_F} × \\frac{\\text{MV}_P}{\\text{MV}_F}$ — for cash equitization, $β_T = 1$ and $β_P = 0$",
              "VIX: implied 30-day annualized volatility for S&P 500. Contango = negative roll yield for long VIX futures",
              "Variance swap: long receives realized variance, pays implied variance. Convex — payoffs increase faster with rising vol",
              "Variance-swap settlement: Variance Notional × (Realized Variance − Strike Variance)",
              "Fed funds futures: implied probability = (expected rate − current rate) / assumed rate-step size"
            ]
          },
          {
            id: "l3-der-3",
            title: "Module 3: Currency Management",
            notes: [
              "Domestic-currency return: $R_{DC} = (1 + R_{FC})(1 + R_{FX}) − 1 ≈ R_{FC} + R_{FX}$ for small returns",
              "Positive correlation between RFC and RFX increases portfolio volatility → stronger case for hedging",
              "Passive hedging: matches currency exposure to benchmark. Discretionary: modest deviations allowed. Active: max flexibility",
              "Roll yield in currency hedging: negative when domestic currency at forward premium (contango); positive when at discount",
              "Vanilla option hedges: ATM put (full protection, expensive), OTM put (cheaper, partial protection), Collar (caps upside to reduce cost)",
              "Seagull spread = put spread + sell OTM call. Cheapest hedge; limits downside but also limits upside",
              "Cross-currency basis: extra spread when synthetic borrowing via FX swap costs more than direct borrowing",
              "Carry trade: borrow low-rate (funding) currency, invest in high-rate currency. Risks: currency depreciation, volatility spikes",
              "Minimum-variance hedge ratio: regress past portfolio value changes on hedging instrument changes"
            ]
          }
        ]
      }
    ]
  }
};