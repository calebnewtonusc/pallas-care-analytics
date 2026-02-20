import type { StrategicRecommendation } from "./types";

export const recommendations: StrategicRecommendation[] = [
  {
    id: "R1",
    title: "Implement Real-Time Financial Dashboard for Leadership",
    category: "Technology",
    priority: "Critical",
    impact: 9,
    effort: 4,
    timeframe: "30 days",
    description:
      "Deploy a live financial reporting layer that surfaces revenue, margins, billing efficiency, and caregiver cost per hour. Leadership currently relies on lagging monthly summaries with a 2–3 week delay.",
    expectedOutcome:
      "Reduce financial decision latency by 85%. Enable faster rate adjustments, payor negotiation, and proactive cost controls. Estimated $42K/year in avoidable cost overruns.",
    dataEvidence:
      "February revenue is trending 11.5% below target mid-month. Current reporting structure cannot detect this until month-end close.",
  },
  {
    id: "R2",
    title: "Expand Beverly Hills / Century City Service Zone",
    category: "Growth",
    priority: "High",
    impact: 8,
    effort: 6,
    timeframe: "90 days",
    description:
      "Beverly Hills and Century City yield the highest average client satisfaction (4.82) and highest revenue per client. This zone is currently at 94% caregiver capacity with only 9 caregivers for 14 clients. Recruit 3 additional premium caregivers specifically for this zone.",
    expectedOutcome:
      "Accommodate 4–6 new clients at $38–52/hr rates, generating an estimated $185–245K in additional annual revenue with minimal marketing cost.",
    dataEvidence:
      "Zone has highest client-to-caregiver ratio (1.56:1) vs. company average (1.54:1) and lowest scheduling flexibility margin.",
  },
  {
    id: "R3",
    title: "Launch Structured Family Communication Program",
    category: "Operations",
    priority: "High",
    impact: 7,
    effort: 3,
    timeframe: "30 days",
    description:
      "Establish a bi-weekly structured family update protocol for all moderate and intensive care clients. This addresses the lowest satisfaction category (Billing & Transparency: 4.44) and directly correlates with longer client tenure.",
    expectedOutcome:
      "Improve satisfaction scores in communication and transparency from 4.44 to 4.70+, reduce voluntary churn by estimated 1.2 points, extending average client LTV from $56.2K to $62.8K.",
    dataEvidence:
      "Billing & Transparency is the lowest satisfaction dimension at 4.44. Clients with <12-month tenure report communication gaps as the #1 friction point.",
  },
  {
    id: "R4",
    title: "Build Employee Referral Incentive Pipeline",
    category: "Workforce",
    priority: "High",
    impact: 8,
    effort: 3,
    timeframe: "30 days",
    description:
      "Caregiver hires sourced via employee referral have a 91.2% retention rate vs. 72.4% from job boards. Formalize and incentivize this channel with a structured $300–500 referral bonus paid at the 90-day mark.",
    expectedOutcome:
      "Increase referral-sourced hires from 37.5% to 55%+ of total hires. Reduce caregiver turnover by estimated 3.8 points, saving $28K/year in recruitment and training costs.",
    dataEvidence:
      "Current referral hires (18/48 = 37.5%) show 91.2% retention vs. 72.4% for job board hires. Delta is 18.8 percentage points.",
  },
  {
    id: "R5",
    title: "Develop Long-Term Care Insurance Billing Expertise",
    category: "Revenue",
    priority: "High",
    impact: 7,
    effort: 5,
    timeframe: "90 days",
    description:
      "LTCI represents 22% of revenue ($626K) but involves complex claims processing that delays cash collections. Hire or train one dedicated LTCI billing specialist to manage claims, reduce Days Sales Outstanding from 18 to under 12 days.",
    expectedOutcome:
      "Reduce AR DSO from 18 to 12 days for LTCI clients. Unlock approximately $35K in accelerated cash flow. Reduce billing-related client friction.",
    dataEvidence:
      "LTCI DSO is 2.3x longer than private-pay clients. This payor segment is growing 8% annually in the 65+ LA County demographic.",
  },
  {
    id: "R6",
    title: "Implement Care Outcomes Measurement Framework",
    category: "Operations",
    priority: "Medium",
    impact: 8,
    effort: 7,
    timeframe: "6 months",
    description:
      "Formalize a quarterly care outcomes assessment for all active clients measuring functional independence, fall incidents, emergency department utilization, and subjective wellbeing scores. Quantified outcomes enable premium pricing justification and hospital partnership development.",
    expectedOutcome:
      "Create a competitive moat via documented outcomes data. Position Pallas for hospital system referral partnerships worth 15–25 new clients/year. Justify 8–12% rate premium.",
    dataEvidence:
      "Currently no structured outcomes tracking. Anecdotal satisfaction data is strong (4.71/5) but lacks clinical metrics needed for B2B partnerships.",
  },
  {
    id: "R7",
    title: "Establish Digital Presence and Online Intake Funnel",
    category: "Growth",
    priority: "Medium",
    impact: 6,
    effort: 5,
    timeframe: "90 days",
    description:
      "Online search / website currently contributes only 13.5% of new clients with a 14-day average conversion window (vs. 5–8 days for referral channels). Rebuild intake flow with online assessment form, automated follow-up sequence, and care coordinator scheduling tool.",
    expectedOutcome:
      "Reduce online conversion window from 14 to 8 days. Increase digital channel client share from 13.5% to 20% over 12 months, adding estimated 6–8 new clients annually.",
    dataEvidence:
      "Online channel has 14-day conversion lag, 2x slower than referral. Improving this channel reduces acquisition cost and diversifies lead sources.",
  },
  {
    id: "R8",
    title: "Pilot Live-In Care Program Expansion",
    category: "Revenue",
    priority: "Medium",
    impact: 8,
    effort: 6,
    timeframe: "6 months",
    description:
      "Live-in clients generate $142K average annual revenue each — 3.7x the company average. Current 4 live-in clients represent only 5.4% of client mix. With dedicated live-in caregiver recruitment and structured matching, Pallas can safely scale to 8–10 live-in clients.",
    expectedOutcome:
      "Adding 4 live-in clients generates $568K in annual revenue. Gross margin profile is comparable to standard care at ~38%. This represents a $200K+ net revenue expansion.",
    dataEvidence:
      "Live-in clients at $142K average revenue/year vs. company average $38.5K. Current caregiver pool has 6 live-in-eligible caregivers with 0% overtime.",
  },
];

export const strategyMatrix = recommendations.map((r) => ({
  id: r.id,
  title: r.title,
  impact: r.impact,
  effort: r.effort,
  priority: r.priority,
  category: r.category,
  timeframe: r.timeframe,
}));

export const categoryColors: Record<string, string> = {
  Revenue: "#5A378C",    // brand purple
  Operations: "#0D9488", // dark teal
  Workforce: "#15803D",  // forest green
  Technology: "#1D4ED8", // deep navy
  Growth: "#B45309",     // dark amber
};

export const priorityColors: Record<string, string> = {
  Critical: "#16121e",   // near-black — most serious
  High: "#5A378C",       // brand purple
  Medium: "#9b92a8",     // gray
  Low: "#c4b5d4",        // light gray
};
