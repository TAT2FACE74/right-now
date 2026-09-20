export function Plans() {
  const plans = [
    { title: '7 Days of Peace', days: 7, blurb: 'Anxiety, trust, and rest in God.' },
    { title: 'Psalms Journey', days: 30, blurb: 'A chapter a day through the Psalms.' },
    { title: 'Hope When Heavy', days: 14, blurb: 'Scripture for grief and discouragement.' },
    { title: 'New Testament Starter', days: 21, blurb: 'Begin with the Gospels and letters.' },
  ];
  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Plans</div>
        <h1>Walk with the Word</h1>
        <p className="muted">Phase 1 stubs — full tracking comes next.</p>
      </div>
      {plans.map((p) => (
        <section key={p.title} className="card">
          <h2>{p.title}</h2>
          <p className="muted">
            {p.days} days · {p.blurb}
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-ghost" disabled>
              Coming soon
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
