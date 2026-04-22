import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <PageBanner
        title="404_Error"
        description="We are here to help you when you need your<br>financial support, then we are help you."
      />

      <section className="commonSection page_4040">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="content_404 text-center">
                <h1>404</h1>
                <h4>Opps! This page is not found.</h4>
                <p>
                  Simply import the sample files we ship with the theme and the core structure for your
                  site is already mind that you don&apos;t use the demo content.
                </p>
                <Link className="common_btn" href="/">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
}
