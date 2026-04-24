import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminAboutPage() {
    return (
        <AdminSingleForm
            title="About Page"
            description="Edit all content sections on the About page."
            apiPath="about"
            fields={[
                // Banner
                { key: "bannerTitle", label: "Banner Title", placeholder: "About us" },
                { key: "bannerDesc", label: "Banner Description (HTML allowed)", placeholder: "We are here to help you..." },

                // Section 1
                { key: "sec1Heading", label: "Section 1 – Heading", placeholder: "Why we are starting our company?" },
                { key: "sec1Sub", label: "Section 1 – Subtext", placeholder: "We are here to help you..." },
                { key: "sec1Body1", label: "Section 1 – Paragraph 1", type: "textarea", placeholder: "Body text..." },
                { key: "sec1Body2", label: "Section 1 – Paragraph 2", type: "textarea", placeholder: "Body text..." },
                { key: "sec1Image", label: "Section 1 – Image Path", placeholder: "/images/about/1.png" },

                // Section 2
                { key: "sec2Heading", label: "Section 2 – Heading", placeholder: "We are leading pay loan financial company." },
                { key: "sec2Sub", label: "Section 2 – Subtext", placeholder: "We are here to help you..." },
                { key: "sec2Link", label: "Section 2 – Link Text", type: "textarea", placeholder: "Link paragraph text..." },
                { key: "sec2Body", label: "Section 2 – Body Paragraph", type: "textarea", placeholder: "Body text..." },
                { key: "sec2Image", label: "Section 2 – Image Path", placeholder: "/images/about/2.png" },

                // History section
                { key: "historyTitle", label: "History – Section Title", type: "textarea", placeholder: "We have 25 years experienced..." },
                { key: "historyDesc", label: "History – Section Description", placeholder: "We are here to help you..." },

                // History card 1
                { key: "history1Period", label: "History Card 1 – Period", placeholder: "2010 to 2013" },
                { key: "history1FrontDesc1", label: "History Card 1 – Front Desc 1", type: "textarea", placeholder: "..." },
                { key: "history1FrontDesc2", label: "History Card 1 – Front Desc 2", type: "textarea", placeholder: "..." },
                { key: "history1BackDesc1", label: "History Card 1 – Back Desc 1", type: "textarea", placeholder: "..." },
                { key: "history1BackDesc2", label: "History Card 1 – Back Desc 2", type: "textarea", placeholder: "..." },

                // History card 2
                { key: "history2Period", label: "History Card 2 – Period", placeholder: "2014 to 2016" },
                { key: "history2FrontDesc1", label: "History Card 2 – Front Desc 1", type: "textarea", placeholder: "..." },
                { key: "history2FrontDesc2", label: "History Card 2 – Front Desc 2", type: "textarea", placeholder: "..." },
                { key: "history2BackDesc1", label: "History Card 2 – Back Desc 1", type: "textarea", placeholder: "..." },
                { key: "history2BackDesc2", label: "History Card 2 – Back Desc 2", type: "textarea", placeholder: "..." },

                // History card 3
                { key: "history3Period", label: "History Card 3 – Period", placeholder: "2017 to 2019" },
                { key: "history3FrontDesc1", label: "History Card 3 – Front Desc 1", type: "textarea", placeholder: "..." },
                { key: "history3FrontDesc2", label: "History Card 3 – Front Desc 2", type: "textarea", placeholder: "..." },
                { key: "history3BackDesc1", label: "History Card 3 – Back Desc 1", type: "textarea", placeholder: "..." },
                { key: "history3BackDesc2", label: "History Card 3 – Back Desc 2", type: "textarea", placeholder: "..." },
            ]}
        />
    );
}
