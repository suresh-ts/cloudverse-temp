import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Company() {
  useEffect(() => {
    document.title = "Company — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      {/* Intro */}
      <section className="py-cv-sec-lg">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12 text-center space-y-4 sm:space-y-6">
          <h1 className="cv-h1">About CloudVerse™</h1>
          <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted">
            CloudVerse builds cloud financial management software for modern enterprises operating across cloud, data, and AI platforms.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <h2 className="cv-h2 mb-6 text-center">What we do</h2>
          <p className="text-sm text-cv-muted text-center mb-8">
            We help organizations gain visibility, accountability, and control over cloud spend—without slowing teams down.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Multi-cloud and multi-platform cost visibility</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Accurate allocation and chargeback</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Detected and predicted anomalies</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Automation-first optimization</span>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <h2 className="cv-h2 mb-8 text-center">How we work</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Enterprise-first by design</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Automation over manual effort</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Safe-by-default integrations</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Built to scale with complex organizations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <h2 className="cv-h2 mb-6 text-center">Trust and security</h2>
          <p className="text-sm text-cv-muted text-center mb-8">
            CloudVerse is built for enterprise environments with a focus on security, access control, and auditability.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Read-only, scoped integrations</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Enterprise access controls</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">Audit logs and governance</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted">ISO 27001 and SOC 2 Type II alignment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="cv-h2 mb-3">Get in touch</h2>
          <p className="text-sm text-cv-muted mb-6">
            To learn more about CloudVerse, request a demo or contact our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/demo" onClick={() => track("cta_demo", { location: "company_contact" })}>
              <Button size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </Link>
            <Link href="/contact" onClick={() => track("cta_contact_sales", { location: "company_contact" })}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="cv-h2 mb-6">See CloudVerse on your data.</h2>
          <Link href="/demo" onClick={() => track("cta_demo", { location: "company_footer" })}>
            <Button size="lg">
              Book a demo
            </Button>
          </Link>
        </div>
      </section>
    </BaseLayout>
  );
}
