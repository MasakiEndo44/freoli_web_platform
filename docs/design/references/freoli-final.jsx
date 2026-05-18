// freoli-final.jsx
// 採用デザイン確定版: HE-01 + NextLive-2
// Mobile 375px / Desktop 1024px × 主案(artsha) / 副案(live photo)
// Depends on: freoli-components.jsx, freoli-sections.jsx (NextLive2)

const FRArr = ({ sz = 12, col = 'currentColor' }) => (
  <svg width={sz} height={sz} viewBox="0 0 12 12" fill="none"
    stroke={col} strokeWidth="2" strokeLinecap="round">
    <path d="M2 6h8M6 2l4 4-4 4" />
  </svg>
);

// ── Mobile Hero 375px ──────────────────────────────────────────
// HE-01 Classic Gradient. live prop switches photo type.
const HeroMobile = ({ live = false }) => (
  <div style={{ background: FR.black, fontFamily: "Inter,'Noto Sans JP',sans-serif" }}>
    <div style={{ position: 'relative', height: '524px', overflow: 'hidden' }}>
      <FRBandPhoto live={live}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {/* B-b: sky-400→cyan-400 gradient wash */}
      <div style={{ position: 'absolute', inset: 0, background:
        'linear-gradient(148deg,rgba(56,189,248,0.22) 0%,rgba(34,211,238,0.14) 40%,transparent 66%)' }} />
      {/* Dark base for legibility */}
      <div style={{ position: 'absolute', inset: 0, background:
        'linear-gradient(to bottom,transparent 18%,rgba(0,0,0,0.66) 60%,#000 100%)' }} />
      {/* C-c: FREOLI (Inter) + Japanese sub */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 30px' }}>
        <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: '64px',
          letterSpacing: '-0.03em', lineHeight: 0.92, color: FR.z50, marginBottom: '11px' }}>
          FREOLI
        </div>
        <div style={{ fontFamily: "'Noto Sans JP',sans-serif", fontWeight: 500, fontSize: '12px',
          color: FR.sk4, letterSpacing: '0.12em', marginBottom: '24px' }}>
          東京発、4人組インディーロック
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px',
          background: FR.cy4, color: FR.black, fontFamily: 'Inter,sans-serif',
          fontWeight: 700, fontSize: '12px', padding: '11px 22px', letterSpacing: '0.06em' }}>
          NEXT LIVE <FRArr col={FR.black} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>
);

// ── Desktop Hero 1024px ────────────────────────────────────────
const HeroDesktop = ({ live = false }) => {
  const icons = [
    { name: 'Instagram', svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg> },
    { name: 'YouTube',   svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none"/></svg> },
    { name: 'TikTok',    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 1 0 6.33 6.34l.03-8.46a8.16 8.16 0 0 0 4.77 1.53V3.04a4.85 4.85 0 0 1-1.03-.35z"/></svg> },
    { name: 'X',         svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  ];
  return (
    <div style={{ background: FR.black, fontFamily: "Inter,'Noto Sans JP',sans-serif" }}>
      <div style={{ position: 'relative', height: '620px', overflow: 'hidden' }}>
        <FRBandPhoto live={live}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background:
          'linear-gradient(148deg,rgba(56,189,248,0.2) 0%,rgba(34,211,238,0.12) 42%,transparent 68%)' }} />
        <div style={{ position: 'absolute', inset: 0, background:
          'linear-gradient(to bottom,transparent 22%,rgba(0,0,0,0.52) 55%,#000 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 64px 56px' }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: '116px',
            letterSpacing: '-0.036em', lineHeight: 0.88, color: FR.z50, marginBottom: '18px' }}>
            FREOLI
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <div style={{ fontFamily: "'Noto Sans JP',sans-serif", fontWeight: 500,
              fontSize: '15px', color: FR.sk4, letterSpacing: '0.1em' }}>
              東京発、4人組インディーロック
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: FR.cy4, color: FR.black, fontFamily: 'Inter,sans-serif',
              fontWeight: 700, fontSize: '14px', padding: '13px 28px', letterSpacing: '0.06em' }}>
              NEXT LIVE <FRArr sz={14} col={FR.black} />
            </div>
          </div>
        </div>
      </div>
      {/* Desktop SNS Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '52px', padding: '18px 64px', background: FR.z950,
        borderTop: `1px solid ${FR.z800}`, borderBottom: `1px solid ${FR.z800}` }}>
        {icons.map(({ name, svg }) => (
          <div key={name} style={{ color: FR.z400, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            {svg}
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px',
              letterSpacing: '0.04em', color: FR.z600 }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Desktop NextLive-2 1024px ──────────────────────────────────
// Horizontal two-column: date+venue left / time+ticket+CTA right
const NL2Desktop = () => (
  <div style={{ background: FR.black, padding: '52px 64px 56px',
    fontFamily: "Inter,'Noto Sans JP',sans-serif" }}>
    <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', fontWeight: 600,
      letterSpacing: '0.28em', color: FR.z400, marginBottom: '44px' }}>
      — NEXT LIVE
    </div>

    <div style={{ display: 'flex', gap: '72px', alignItems: 'flex-start' }}>
      {/* Left: Giant date + venue */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: '96px',
            letterSpacing: '-0.05em', lineHeight: 0.84, color: FR.z50 }}>7.11</div>
          <div style={{ paddingBottom: '8px', marginLeft: '14px' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '22px',
              color: FR.cy4, lineHeight: 1 }}>FRI</div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '14px', color: FR.z400 }}>2025</div>
          </div>
        </div>
        <div style={{ fontFamily: "'Noto Sans JP',sans-serif", fontWeight: 700,
          fontSize: '26px', color: FR.z50, marginBottom: '6px' }}>Blue Sheep</div>
        <div style={{ fontFamily: "'Noto Sans JP',sans-serif",
          fontSize: '13px', color: FR.z400 }}>下北沢 — 下北沢駅 徒歩3分</div>
      </div>

      {/* Vertical rule */}
      <div style={{ width: '1px', background: FR.z800, alignSelf: 'stretch', marginTop: '4px' }} />

      {/* Right: Time / Ticket / CTA */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '44px', marginBottom: '36px' }}>
          <div style={{ borderLeft: `2px solid ${FR.z800}`, paddingLeft: '18px' }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px',
              letterSpacing: '0.16em', color: FR.z400, marginBottom: '8px' }}>OPEN / START</div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600,
              fontSize: '20px', color: FR.z50 }}>19:00 / 19:30</div>
          </div>
          <div style={{ borderLeft: `2px solid ${FR.cy4}`, paddingLeft: '18px',
            boxShadow: `-2px 0 12px rgba(34,211,238,0.2)` }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px',
              letterSpacing: '0.16em', color: FR.z400, marginBottom: '8px' }}>TICKET</div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 800,
              fontSize: '28px', color: FR.cy4 }}>¥3,000</div>
          </div>
        </div>

        <div style={{ background: FR.z900, border: `1px solid ${FR.z800}`, borderRadius: '6px',
          padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Noto Sans JP',sans-serif",
              fontSize: '12px', color: FR.z400, marginBottom: '5px' }}>チケット予約</div>
            <div style={{ fontFamily: "'Noto Sans JP',sans-serif",
              fontSize: '16px', color: FR.z50 }}>会場へお問い合わせください</div>
          </div>
          <div style={{ background: FR.cy4, color: FR.black, fontFamily: 'Inter,sans-serif',
            fontWeight: 700, fontSize: '13px', padding: '12px 24px',
            letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>予約する →</div>
        </div>
      </div>
    </div>
  </div>
);

// ── Page compositions ──────────────────────────────────────────
const PageMobile  = ({ live = false }) => <div><HeroMobile live={live} /><NextLive2 /></div>;
const PageDesktop = ({ live = false }) => <div><HeroDesktop live={live} /><NL2Desktop /></div>;

Object.assign(window, { FRArr, HeroMobile, HeroDesktop, NL2Desktop, PageMobile, PageDesktop });
