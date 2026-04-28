import { getSettings, getTeam, getTestimonials, getAboutPage } from "@/lib/data";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Image from "next/image";
import DynamicImage from "@/components/DynamicImage";
import Link from "next/link";

export const revalidate = 60;

export default async function AboutPage() {
  const [settings, team, testimonials, about] = await Promise.all([
    getSettings(),
    getTeam(),
    getTestimonials(),
    getAboutPage(),
  ]);

  const historyItems = [
    {
      period: about.history1Period,
      frontDesc1: about.history1FrontDesc1,
      frontDesc2: about.history1FrontDesc2,
      backDesc1: about.history1BackDesc1,
      backDesc2: about.history1BackDesc2,
    },
    {
      period: about.history2Period,
      frontDesc1: about.history2FrontDesc1,
      frontDesc2: about.history2FrontDesc2,
      backDesc1: about.history2BackDesc1,
      backDesc2: about.history2BackDesc2,
    },
    {
      period: about.history3Period,
      frontDesc1: about.history3FrontDesc1,
      frontDesc2: about.history3FrontDesc2,
      backDesc1: about.history3BackDesc1,
      backDesc2: about.history3BackDesc2,
    },
  ];

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title={about.bannerTitle}
        description={about.bannerDesc}
      />

      {/* Section 1 */}
      <section className="commonSection ab_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="singleABThumb">
                <DynamicImage src={about.sec1Image} alt="About" width={660} height={500} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="singleAB text-left">
                <h2>{about.sec1Heading}</h2>
                <p>{about.sec1Sub}</p>
                <p>{about.sec1Body1}</p>
                <p>{about.sec1Body2}</p>
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
                <h2>{about.sec2Heading}</h2>
                <p>{about.sec2Sub}</p>
                <p>
                  <Link href="#">{about.sec2Link}</Link>
                </p>
                <p>{about.sec2Body}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="singleABThumb_2">
                <DynamicImage src={about.sec2Image} alt="About" width={540} height={450} />
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
              <h2
                className="sec_title"
                dangerouslySetInnerHTML={{ __html: about.historyTitle.replace(/\n/g, "<br />") }}
              />
              <p className="sec_desc">{about.historyDesc}</p>
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
      <TestimonialsSection sectionClass="custome_sec" showThumb={true} testimonials={testimonials} />
      <Footer settings={settings} />
      <Copyright settings={settings} />
    </>
  );
}
