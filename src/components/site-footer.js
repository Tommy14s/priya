"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function SiteFooter({ content }) {
  const { shared } = useLanguage();
  const mergedContent = { ...shared.footer, ...content };
  const title = mergedContent.title;
  const description = mergedContent.description;
  const navigationTitle = mergedContent.navigationTitle;
  const visitTitle = mergedContent.visitTitle;
  const privacyLabel = mergedContent.privacyLabel;
  const termsLabel = mergedContent.termsLabel;
  const contactLabel = mergedContent.contactLabel;
  const careersLabel = mergedContent.careersLabel;
  const copyright = mergedContent.copyright;

  return (
    <footer className="border-t-2 border-primary-container/20 bg-surface-container-low px-5 py-16 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="font-display text-3xl text-primary">{title}</div>
          <p className="max-w-xs text-base leading-7 text-on-surface-variant">{description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-display text-2xl text-primary">{navigationTitle}</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link className="text-on-surface-variant transition hover:text-primary" href="#">
                {privacyLabel}
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant transition hover:text-primary" href="#">
                {termsLabel}
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant transition hover:text-primary" href="/book">
                {contactLabel}
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant transition hover:text-primary" href="#">
                {careersLabel}
              </Link>
            </li>
          </ul>
        </div>

        <div id="visit" className="flex flex-col gap-4">
          <h4 className="font-display text-2xl text-primary">{visitTitle}</h4>
          <p className="text-base leading-7 text-on-surface-variant">
            123 Golden Path Avenue
            <br />
            Sanctuary District, 90210
          </p>
          <p className="pt-4 text-sm text-on-surface-variant">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
