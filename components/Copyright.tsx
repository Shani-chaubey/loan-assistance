"use client";

import Link from "next/link";
import type { SiteSettings } from "@/lib/data";

export default function Copyright({ settings }: { settings?: SiteSettings }) {
  const siteName = settings?.siteName ?? "Payloan";

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <p>
              Copyright <Link href="/">{siteName}</Link>. All rights reserved
            </p>
          </div>
          <div className="col-sm-6 text-right">
            <a href="#" id="backTo" onClick={scrollToTop}>
              <i className="flaticon-chevron"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
