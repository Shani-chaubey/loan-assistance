interface PageBannerProps {
  title: string;
  description?: string;
}

export default function PageBanner({ title, description }: PageBannerProps) {
  return (
    <section className="pagebanner">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="bannerTitle text-left">
              <h2>{title}</h2>
              {description && (
                <p dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
