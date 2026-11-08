import SectionHeading from "./SectionHeading";

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ accordion. Answers stay in the HTML when collapsed, so search engines read them. */
export default function Faq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="section--tight section--surface" aria-labelledby="faq-heading">
      <div className="container faq">
        <SectionHeading eyebrow="FAQs" title={<span id="faq-heading">{title}</span>} />
        <div className="faq__list">
          {items.map((item) => (
            <details key={item.question} className="faq__item">
              <summary>
                <h3>{item.question}</h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
