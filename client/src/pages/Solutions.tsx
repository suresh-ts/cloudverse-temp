import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { SolutionPreviewPanel } from "@/components/SolutionPreviewPanel";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Solutions() {
  useEffect(() => {
    document.title = "Solutions — CloudVerse";
  }, []);

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20">
        <div className="cv-container text-center space-y-4 sm:space-y-6 max-w-[800px] mx-auto">
          <span className="cv-cap font-semibold tracking-widest text-cv-muted uppercase">
            Solutions
          </span>
          <h1 className="cv-h1">Cloud financial management for every team.</h1>
          <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted">
            CloudVerse adapts to how Finance, Engineering, and IT teams work—without forcing trade-offs.
          </p>
        </div>
      </section>

      {/* Finance Section */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="max-w-[640px]">
              <h2 className="text-2xl font-semibold mb-2 text-cv-ink dark:text-cv-ink">For Finance teams</h2>
              <p className="text-base text-cv-muted mb-4">Control spend. Improve accountability. Close with confidence.</p>
              <p className="text-[15px] leading-[24px] text-cv-muted mb-6 max-w-[65ch]">
                Get accurate visibility, allocation, and automation across cloud, data, and AI spend—without manual effort.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Audit-ready showback and chargeback</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Accurate cost allocation across teams and products</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Detected and predicted anomalies before month-end</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Realized savings tracking, not estimates</span>
                </li>
              </ul>
            </div>
            {/* Right: Preview Panel */}
            <div className="hidden lg:block">
              <SolutionPreviewPanel
                eyebrow="Finance View"
                title="Close with confidence"
                lines={[
                  "Allocation-ready views",
                  "Audit-friendly exports",
                  "Savings tracked as realized"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Preview Panel */}
            <div className="hidden lg:block order-last lg:order-first">
              <SolutionPreviewPanel
                eyebrow="Engineering View"
                title="Cost context before it ships"
                lines={[
                  "Service + environment signals",
                  "Actionable recommendations",
                  "Clear ownership mapping"
                ]}
              />
            </div>
            {/* Right: Text */}
            <div className="max-w-[640px]">
              <h2 className="text-2xl font-semibold mb-2 text-cv-ink dark:text-cv-ink">For Engineering teams</h2>
              <p className="text-base text-cv-muted mb-4">Build fast—without breaking the budget.</p>
              <p className="text-[15px] leading-[24px] text-cv-muted mb-6 max-w-[65ch]">
                Bring cost context into engineering workflows so teams can make informed decisions early.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Shift-left cost visibility aligned to services and environments</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Actionable recommendations engineers can apply</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Fewer surprises from cloud, data, and AI workloads</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Clear ownership through normalized dimensions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IT / Platform Section */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="max-w-[640px]">
              <h2 className="text-2xl font-semibold mb-2 text-cv-ink dark:text-cv-ink">For IT and platform teams</h2>
              <p className="text-base text-cv-muted mb-4">Standardize, govern, and automate at scale.</p>
              <p className="text-[15px] leading-[24px] text-cv-muted mb-6 max-w-[65ch]">
                Create a consistent financial layer across providers, accounts, and platforms—without slowing teams down.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Unified taxonomy across clouds and platforms</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Autonomous tag normalization and drift detection</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Guardrails for safe automation</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cv-muted">
                  <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
                  <span>Enterprise-grade access control and auditability</span>
                </li>
              </ul>
            </div>
            {/* Right: Preview Panel */}
            <div className="hidden lg:block">
              <SolutionPreviewPanel
                eyebrow="Platform View"
                title="Governance at scale"
                lines={[
                  "Normalized dimensions",
                  "Guardrails for safe automation",
                  "Access controls + auditability"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container text-center">
          <div className="max-w-[720px] mx-auto space-y-4">
            <h2 className="cv-h2">See CloudVerse on your data.</h2>
            <p className="cv-body text-cv-muted">
              We'll help map your structure and automation opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link href="/demo" onClick={() => track("cta_demo", { location: "solutions_bottom" })}>
                <Button size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
              <Link href="/contact" onClick={() => track("cta_contact", { location: "solutions_bottom" })}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Contact sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
