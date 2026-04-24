import { getSettings, getTeam } from "@/lib/data";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Image from "next/image";
import Link from "next/link";

const historyItems = [
  {
    period: "2010 to 2013",
    frontDesc1: "We all know how hard it can be to make your start into the world of as easy possible.",
    frontDesc2: "We all know how hard it can be to as easy possible.",
    backDesc1: "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
    backDesc2: "We all know how hard it can be to make site look like the demo so to make your start into.",
  },
  {
    period: "2014 to 2016",
    frontDesc1: "We all know how hard it can be to make your start into the world of as easy possible.",
    frontDesc2: "We all know how hard it can be to as easy possible.",
    backDesc1: "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
    backDesc2: "We all know how hard it can be to make site look like the demo so to make your start into.",
  },
  {
    period: "2017 to 2019",
    frontDesc1: "We all know how hard it can be to make your start into the world of as easy possible.",
    frontDesc2: "We all know how hard it can be to as easy possible.",
    backDesc1: "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
    backDesc2: "We all know how hard it can be to make site look like the demo so to make your start into.",
  },
];

export const revalidate = 60;

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);
  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="About us"
        description="We are here to help you when you need your<br>financial support, then we are help you."
      />

      {/* Section 1 */}
      <section className="commonSection ab_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="singleABThumb">
                <Image src="/images/about/1.png" alt="About" width={660} height={500} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="singleAB text-left">
                <h2>Why we are starting our company?</h2>
                <p>We are here to help you when you need your financial support, then we are help you.</p>
                <p>
                  We all know how hard it can be to make a site look like the demo, so to make your
                  start into the world of as easy as possible have included the demo content from showcase
                  site. Simply import the sample files we ship with the theme and the core structure for
                  your site is already built mind that even if you don&apos;t use the demo content,.
                </p>
                <p>
                  We all know how hard it can be to make a site look like the demo, so to make your
                  start into the world of as easy as possible have included the demo content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="commonSection ab_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="singleAB text-left">
                <h2>We are leading pay loan financial company.</h2>
                <p>We are here to help you when you need your financial support, then we are help you.</p>
                <p>
                  <Link href="#">
                    We all know how hard it can be to make a site look like the demo, so to make your
                    start into the world of as easy as possible have included the demo content.
                  </Link>
                </p>
                <p>
                  We all know how hard it can be to make a site look like the demo, so to make your
                  start into the world of as easy as possible have included the demo content from showcase
                  site. Simply import the sample files we ship with the theme and the core structure for
                  your site is already built mind that even if you don&apos;t use the demo content,.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="singleABThumb_2">
                <Image src="/images/about/2.png" alt="About" width={540} height={450} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="commonSection com_history">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="sec_title">
                We have 25 years experienced
                <br /> see our company history
              </h2>
              <p className="sec_desc">
                We are here to help you when you need your financial
                <br /> support, then we are help you.
              </p>
            </div>
          </div>
          <div className="row">
            {historyItems.map((item) => (
              <div key={item.period} className="col-lg-4 col-md-6">
                <div className="singleHistory">
                  <div className="flipper">
                    <div className="front">
                      <h4>{item.period}</h4>
                      <p>{item.frontDesc1}</p>
                      <p>{item.frontDesc2}</p>
                    </div>
                    <div className="back">
                      <h4>{item.period}</h4>
                      <p>{item.backDesc1}</p>
                      <p>{item.backDesc2}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection sectionClass="grays" members={team} />
      <TestimonialsSection sectionClass="custome_sec" showThumb={true} />
      <Footer settings={settings} />
      <Copyright settings={settings} />
    </>
  );
}
