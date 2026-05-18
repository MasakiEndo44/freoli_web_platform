// freoli-components.jsx
// FREOLI Design Tokens + Photo Placeholders + 6 Hero Variants

// ── Design Tokens ──────────────────────────────────────────────
const FR = {
  black: '#000000',
  z950: '#0a0a0a',
  z900: '#18181b',
  z800: '#27272a',
  z700: '#3f3f46',
  z600: '#52525b',
  z400: '#a1a1aa',
  z300: '#d4d4d8',
  z50: '#fafafa',
  cy4: '#22d3ee',
  cy5: '#06b6d4',
  sk4: '#38bdf8',
  sk5: '#0ea5e9',
  err: '#ef4444'
};

// ── Photo Placeholders ─────────────────────────────────────────
// Communicates composition intent before actual photos arrive.
const FRBandPhoto = ({ style = {}, live = false }) => {
  const figures = [
  { left: '13%', width: '11%', height: '72%' },
  { left: '30%', width: '10%', height: '67%' },
  { left: '57%', width: '11%', height: '74%' },
  { left: '76%', width: '10%', height: '69%' }];

  const crowd = [
  { left: '4%', h: '16%', w: '7%' },
  { left: '14%', h: '13%', w: '6%' },
  { left: '22%', h: '18%', w: '8%' },
  { left: '32%', h: '14%', w: '6%' },
  { left: '42%', h: '19%', w: '7%' },
  { left: '52%', h: '15%', w: '6%' },
  { left: '61%', h: '17%', w: '8%' },
  { left: '71%', h: '13%', w: '6%' },
  { left: '80%', h: '20%', w: '7%' },
  { left: '89%', h: '15%', w: '6%' }];


  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: live ?
      'linear-gradient(170deg, #060c0e 0%, #091018 40%, #071018 70%, #050a0c 100%)' :
      'linear-gradient(160deg, #0f0d14 0%, #0e0e12 45%, #111018 75%, #0a0a0e 100%)',
      ...style
    }}>
      {/* Figures */}
      {!live && figures.map((f, i) =>
      <div key={i} style={{
        position: 'absolute',
        bottom: 0,
        left: f.left,
        width: f.width,
        height: f.height,
        background: `rgba(${20 + i * 4},${18 + i * 4},${26 + i * 3},0.88)`,
        borderRadius: '5px 5px 0 0'
      }} />
      )}

      {/* Crowd silhouettes for live */}
      {live && crowd.map((c, i) =>
      <div key={i} style={{
        position: 'absolute',
        bottom: 0,
        left: c.left,
        width: c.w,
        height: c.h,
        background: `rgba(${14 + i},${14 + i},${18 + i},0.82)`,
        borderRadius: '3px 3px 0 0'
      }} />
      )}

      {/* Primary cyan stage glow */}
      <div style={{
        position: 'absolute',
        top: live ? '4%' : '12%',
        left: live ? '22%' : '50%',
        transform: 'translateX(-50%)',
        width: live ? '260px' : '300px',
        height: live ? '260px' : '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${live ? 'rgba(34,211,238,0.16)' : 'rgba(34,211,238,0.07)'} 0%, transparent 68%)`,
        pointerEvents: 'none'
      }} />

      {/* Secondary sky glow (live only) */}
      {live &&
      <div style={{
        position: 'absolute',
        top: '8%', right: '14%',
        width: '180px', height: '180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      }

      {/* Floor gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)',
        pointerEvents: 'none'
      }} />

      {/* Placeholder label */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '9px',
        letterSpacing: '0.22em',
        color: FR.z700,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        userSelect: 'none'
      }}>{live ? 'LIVE PHOTO' : 'BAND PHOTO'}</div>
    </div>);

};

// ── SNS Bar ────────────────────────────────────────────────────
const SNS_ICONS = {
  Instagram:
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>,

  YouTube:
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
    </svg>,

  TikTok:
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l.03-8.46a8.16 8.16 0 0 0 4.77 1.53V3.04a4.85 4.85 0 0 1-1.03-.35z" />
    </svg>,

  X:
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>

};

const FRSNSBar = () =>
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  padding: '14px 20px',
  background: FR.z950,
  borderTop: `1px solid ${FR.z800}`,
  borderBottom: `1px solid ${FR.z800}`
}}>
    {['Instagram', 'YouTube', 'TikTok', 'X'].map((name) =>
  <div key={name} style={{
    color: FR.z400,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px'
  }}>
        {SNS_ICONS[name]}
        <span style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '8px',
      letterSpacing: '0.04em',
      color: FR.z600
    }}>{name}</span>
      </div>
  )}
  </div>;


// ── Shared arrow icon ──────────────────────────────────────────
const ArrowRight = ({ size = 12, color = 'currentColor' }) =>
<svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M2 6h8M6 2l4 4-4 4" />
  </svg>;


// ══════════════════════════════════════════════════════════════
// HERO MAIN VARIANTS  (アー写前提)
// ══════════════════════════════════════════════════════════════

// ── Hero Main-1: A-a × B-a × C-c ──────────────────────────────
// フル幅アー写 / 点光源（95:5） / 混在型タイポ
// Emotional read: photo atmosphere → FREOLI bold → Japanese sub → CTA
const HeroMain1 = () =>
<div style={{ background: FR.black, fontFamily: "Inter, 'Noto Sans JP', sans-serif" }}>
    <div style={{ position: 'relative', height: '524px', overflow: 'hidden' }}>
      <FRBandPhoto style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Fade: transparent → black, bottom 45% */}
      <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.82) 68%, #000 100%)'
    }} />

      {/* Point light A — upper right */}
      <div style={{
      position: 'absolute',
      top: '21%', right: '13%',
      width: '5px', height: '5px',
      borderRadius: '50%',
      background: FR.cy4,
      boxShadow: `0 0 0 2px rgba(34,211,238,0.18), 0 0 18px 7px rgba(34,211,238,0.52)`
    }} />

      {/* Point light B — mid left (smaller, sky) */}
      <div style={{
      position: 'absolute',
      top: '56%', left: '7%',
      width: '3px', height: '3px',
      borderRadius: '50%',
      background: FR.sk4,
      boxShadow: `0 0 10px 4px rgba(56,189,248,0.42)`
    }} />

      {/* Text block */}
      <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      padding: '0 22px 30px'
    }}>
        <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: '64px',
        letterSpacing: '-0.03em',
        lineHeight: 0.92,
        color: FR.z50,
        marginBottom: '12px'
      }}>FREOLI</div>

        <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 500,
        fontSize: '12px',
        color: FR.cy4,
        letterSpacing: '0.12em',
        marginBottom: '24px'
      }}>東京発、4人組インディーロック</div>

        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        background: FR.cy4,
        color: FR.black,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '12px',
        padding: '11px 22px',
        letterSpacing: '0.06em'
      }}>
          NEXT LIVE <ArrowRight color={FR.black} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>;


// ── Hero Main-2: A-b × B-c × C-b ──────────────────────────────
// ロゴ大胆（FREOLI型主役）/ アウトライン光 / 英文ロゴ中心
// Everything glows on near-black. Text/borders/button lit in cyan.
const HeroMain2 = () =>
<div style={{ background: FR.black, fontFamily: 'Inter, sans-serif' }}>
    <div style={{
    position: 'relative',
    height: '524px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 22px'
  }}>
      {/* Barely-visible photo texture */}
      <FRBandPhoto style={{
      position: 'absolute', inset: 0,
      opacity: 0.1
    }} />

      {/* Glowing border rule — top */}
      <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${FR.cy4} 28%, ${FR.sk4} 72%, transparent 100%)`,
      boxShadow: `0 0 10px 2px rgba(34,211,238,0.38)`
    }} />
      {/* Glowing border rule — bottom */}
      <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${FR.cy4} 28%, ${FR.sk4} 72%, transparent 100%)`,
      boxShadow: `0 0 10px 2px rgba(34,211,238,0.38)`
    }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Giant outlined FREOLI */}
        <div style={{

        fontWeight: 800,
        fontSize: '92px',
        letterSpacing: '-0.045em',
        lineHeight: 0.88,
        WebkitTextStroke: `2px ${FR.cy4}`,
        color: 'transparent',
        marginBottom: '22px',
        textShadow: `0 0 48px rgba(34,211,238,0.12)`, fontFamily: "Ubuntu"
      }}>
          FRE<br />OLI
        </div>

        {/* Glowing separator */}
        <div style={{
        width: '44px', height: '1px',
        background: FR.cy4,
        marginBottom: '16px',
        boxShadow: `0 0 8px ${FR.cy4}`
      }} />

        <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '10px',
        letterSpacing: '0.28em',
        color: FR.z400,
        marginBottom: '34px',
        textTransform: 'uppercase'
      }}>TOKYO INDIE ROCK</div>

        {/* Outlined CTA */}
        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        border: `1px solid ${FR.cy4}`,
        color: FR.cy4,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '11px',
        padding: '11px 26px',
        letterSpacing: '0.1em',
        boxShadow: `0 0 18px rgba(34,211,238,0.2), inset 0 0 18px rgba(34,211,238,0.04)`,
        cursor: 'pointer'
      }}>
          NEXT LIVE <ArrowRight size={10} color={FR.cy4} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>;


// ── Hero Main-3: A-c × B-a × C-c ──────────────────────────────
// テキスト左 + 写真右 2カラム / 点光源 / 混在型
// Editorial / magazine feel. Japanese catch copy anchors emotion.
const HeroMain3 = () =>
<div style={{ background: FR.black, fontFamily: "Inter, 'Noto Sans JP', sans-serif" }}>
    <div style={{
    position: 'relative',
    height: '524px',
    overflow: 'hidden'
  }}>
      {/* Photo — right half */}
      <FRBandPhoto style={{
      position: 'absolute',
      top: 0, right: 0,
      width: '53%', height: '100%'
    }} />

      {/* Left-to-right gradient mask */}
      <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to right, #000 32%, rgba(0,0,0,0.64) 60%, rgba(0,0,0,0.18) 100%)'
    }} />

      {/* Point light — top left */}
      <div style={{
      position: 'absolute',
      top: '15%', left: '20px',
      width: '4px', height: '4px',
      borderRadius: '50%',
      background: FR.cy4,
      boxShadow: `0 0 14px 5px rgba(34,211,238,0.62)`
    }} />

      {/* Text block — left column, bottom-anchored */}
      <div style={{
      position: 'absolute',
      top: 0, left: 0,
      width: '60%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 20px 32px 22px'
    }}>
        <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: '44px',
        letterSpacing: '-0.028em',
        lineHeight: 1,
        color: FR.z50,
        marginBottom: '12px'
      }}>FREOLI</div>

        {/* Cyan rule */}
        <div style={{
        width: '26px', height: '2px',
        background: FR.cy4,
        marginBottom: '14px',
        boxShadow: `0 0 8px rgba(34,211,238,0.9)`
      }} />

        {/* Japanese copy */}
        <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 700,
        fontSize: '21px',
        color: FR.z50,
        lineHeight: 1.38,
        marginBottom: '10px',
        letterSpacing: '-0.01em'
      }}>音楽を、<br />心で先に聴く。</div>

        <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: '11px',
        color: FR.z400,
        marginBottom: '26px',
        letterSpacing: '0.06em'
      }}>東京 / 4人組インディーロック</div>

        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: FR.cy4,
        color: FR.black,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        padding: '10px 20px',
        letterSpacing: '0.06em',
        alignSelf: 'flex-start'
      }}>
          NEXT LIVE <ArrowRight size={10} color={FR.black} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>;


// ══════════════════════════════════════════════════════════════
// HERO BACKUP VARIANTS  (ライブ写真前提)
// ══════════════════════════════════════════════════════════════

// ── Hero BK-1: A-a × B-b × C-c ────────────────────────────────
// フル幅ライブ写真 / sky→cyan グラデーション wash / 混在型
const HeroBK1 = () =>
<div style={{ background: FR.black, fontFamily: "Inter, 'Noto Sans JP', sans-serif" }}>
    <div style={{ position: 'relative', height: '524px', overflow: 'hidden' }}>
      <FRBandPhoto live style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Color wash */}
      <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(148deg, rgba(56,189,248,0.2) 0%, rgba(34,211,238,0.12) 38%, transparent 62%)`
    }} />
      {/* Dark base */}
      <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to bottom, transparent 22%, rgba(0,0,0,0.68) 58%, #000 100%)'
    }} />

      <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      padding: '0 22px 30px'
    }}>
        <div style={{

        fontWeight: 800,
        fontSize: '64px',
        letterSpacing: '-0.03em',
        lineHeight: 0.92,
        color: FR.z50,
        marginBottom: '12px', fontFamily: "Inter"
      }}>FREOLI</div>

        <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 500,
        fontSize: '12px',
        color: FR.sk4,
        letterSpacing: '0.12em',
        marginBottom: '24px'
      }}>東京発、4人組インディーロック</div>

        {/* Gradient CTA */}
        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        background: `linear-gradient(135deg, ${FR.sk4} 0%, ${FR.cy4} 100%)`,
        color: FR.black,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '12px',
        padding: '11px 22px',
        letterSpacing: '0.06em'
      }}>
          NEXT LIVE <ArrowRight color={FR.black} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>;


// ── Hero BK-2: A-b × B-a × C-a ────────────────────────────────
// ロゴ背景+ライブ写真 / 点光源コンステレーション / 日本語キャッチ主役
const HeroBK2 = () =>
<div style={{ background: FR.black, fontFamily: "'Noto Sans JP', Inter, sans-serif" }}>
    <div style={{
    position: 'relative',
    height: '524px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 22px'
  }}>
      <FRBandPhoto live style={{ position: 'absolute', inset: 0, opacity: 0.09 }} />

      {/* Constellation dots */}
      {[
    { top: '10%', left: '83%', s: 5 },
    { top: '24%', left: '92%', s: 3 },
    { top: '67%', left: '88%', s: 4 },
    { top: '18%', left: '3%', s: 3 },
    { top: '76%', left: '8%', s: 5 },
    { top: '44%', left: '95%', s: 2 }].
    map((d, i) =>
    <div key={i} style={{
      position: 'absolute',
      top: d.top, left: d.left,
      width: `${d.s}px`, height: `${d.s}px`,
      borderRadius: '50%',
      background: FR.cy4,
      boxShadow: `0 0 ${d.s * 3}px ${d.s}px rgba(34,211,238,0.46)`
    }} />
    )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Small English label */}
        <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        letterSpacing: '0.38em',
        color: FR.cy4,
        marginBottom: '16px'
      }}>FREOLI</div>

        {/* Big Japanese headline */}
        <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 700,
        fontSize: '34px',
        color: FR.z50,
        lineHeight: 1.34,
        marginBottom: '16px',
        letterSpacing: '-0.01em'
      }}>鼓動より先に、<br />色が動いた。</div>

        {/* Cyan rule */}
        <div style={{
        width: '36px', height: '2px',
        background: FR.cy4,
        marginBottom: '22px',
        boxShadow: `0 0 8px rgba(34,211,238,0.9)`
      }} />

        <div style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: '11px',
        color: FR.z400,
        marginBottom: '30px',
        letterSpacing: '0.08em'
      }}>東京 / 4人組インディーロック</div>

        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        background: FR.cy4,
        color: FR.black,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '12px',
        padding: '11px 22px',
        letterSpacing: '0.06em'
      }}>
          NEXT LIVE <ArrowRight color={FR.black} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>;


// ── Hero BK-3: A-a × B-c × C-b ────────────────────────────────
// フル幅ライブ写真 / アウトライン光 / 英文ロゴ中心・ストローク
const HeroBK3 = () =>
<div style={{ background: FR.black, fontFamily: 'Inter, sans-serif' }}>
    <div style={{ position: 'relative', height: '524px', overflow: 'hidden' }}>
      <FRBandPhoto live style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      opacity: 0.55
    }} />

      <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0.9) 100%)'
    }} />

      {/* Glowing top rule */}
      <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '1px',
      background: FR.cy4,
      boxShadow: `0 0 12px 3px rgba(34,211,238,0.52)`
    }} />

      <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      padding: '0 22px 30px'
    }}>
        {/* Outlined FREOLI */}
        <div style={{

        fontWeight: 800,
        fontSize: '66px',
        letterSpacing: '-0.03em',
        lineHeight: 0.92,
        WebkitTextStroke: `1.5px ${FR.z50}`,
        color: 'transparent',
        marginBottom: '12px', fontFamily: "Ubuntu"
      }}>FREOLI</div>

        {/* Cyan underrule */}
        <div style={{
        height: '1px',
        background: `linear-gradient(to right, ${FR.cy4} 0%, transparent 100%)`,
        marginBottom: '14px',
        boxShadow: `0 0 6px rgba(34,211,238,0.42)`
      }} />

        <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '10px',
        letterSpacing: '0.22em',
        color: FR.cy4,
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>TOKYO INDIE ROCK</div>

        {/* Outlined CTA */}
        <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        border: `1px solid ${FR.cy4}`,
        color: FR.cy4,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '11px',
        padding: '10px 24px',
        letterSpacing: '0.08em',
        boxShadow: `0 0 16px rgba(34,211,238,0.26)`,
        cursor: 'pointer'
      }}>
          NEXT LIVE <ArrowRight size={10} color={FR.cy4} />
        </div>
      </div>
    </div>
    <FRSNSBar />
  </div>;


// Export everything to global scope
Object.assign(window, {
  FR,
  FRBandPhoto,
  FRSNSBar,
  ArrowRight,
  HeroMain1, HeroMain2, HeroMain3,
  HeroBK1, HeroBK2, HeroBK3
});