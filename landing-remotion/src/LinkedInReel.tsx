import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import './fonts';

const D = {
  paper: '#2A2723',
  paper2: '#322E29',
  card: '#3A3530',
  ink: '#F3EEE6',
  muted: '#D2CBC0',
  faint: '#A8A196',
  gold: '#E0C06A',
  line: '#5A534A',
} as const;

const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

const fade = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Scene: React.FC<{
  from: number;
  until: number;
  children: React.ReactNode;
  background?: string;
}> = ({ from, until, children, background = D.paper }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= until) return null;
  const inOp = fade(frame, from, 10);
  const outOp = interpolate(frame, [until - 10, until], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background, opacity: Math.min(inOp, outOp) }}>{children}</AbsoluteFill>
  );
};

const Title: React.FC<{
  from: number;
  kicker?: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
}> = ({ from, kicker, title, sub, align = 'left' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - from, fps, config: { damping: 18, mass: 0.7 } });
  const y = interpolate(s, [0, 1], [28, 0]);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${y}px)`,
        textAlign: align,
        maxWidth: 900,
      }}
    >
      {kicker && (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: D.gold,
            marginBottom: 18,
          }}
        >
          {kicker}
        </div>
      )}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: '-0.03em',
          color: D.ink,
        }}
      >
        {title}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1.4,
            color: D.muted,
            marginTop: 22,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

const Pill: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
        fontFamily: FONT,
        fontSize: 24,
        fontWeight: 600,
        color: D.ink,
        background: D.card,
        border: `1px solid ${D.line}`,
        borderRadius: 999,
        padding: '12px 22px',
      }}
    >
      {label}
    </div>
  );
};

export const LinkedInReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: D.paper }}>
      <Scene from={0} until={90}>
        <div style={{ padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Title
            from={4}
            kicker="The Swain Office"
            title="An office of AI agents. On your laptop."
            sub="You already pay for the CLIs. This is the floor they work on."
          />
        </div>
      </Scene>

      <Scene from={90} until={240}>
        <Img
          src={staticFile('floor-dusk.png')}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.42 }}
        />
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(180deg, rgba(42,39,35,0.2) 0%, rgba(42,39,35,0.88) 72%, #2A2723 100%)',
          }}
        />
        <div style={{ position: 'absolute', left: 80, right: 80, bottom: 90 }}>
          <Title
            from={100}
            title="They sit at desks. They walk the floor."
            sub="Click a desk. Type. Watch the work happen."
          />
        </div>
      </Scene>

      <Scene from={240} until={420}>
        <div style={{ padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Title
            from={250}
            kicker="Orchestrator"
            title="You talk to one boss."
            sub="He assigns the work, routes mail, and only pings you for spend, deletes, or a change of plan."
          />
        </div>
      </Scene>

      <Scene from={420} until={600}>
        <div style={{ padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 36 }}>
          <Title
            from={430}
            kicker="Real terminals"
            title="Not a simulated chat."
            sub="Each agent is a live PTY. Same Claude Code, Codex, Gemini, Cursor you already run."
          />
        </div>
      </Scene>

      <Scene from={600} until={780}>
        <div style={{ padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Title
            from={610}
            kicker="Local hive"
            title="Memory stays on disk."
            sub="Markdown notes. File mailboxes. A task board. An event log. Nothing leaves the machine unless you send it."
          />
        </div>
      </Scene>

      <Scene from={780} until={960}>
        <div style={{ padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Title
            from={790}
            kicker="Human in the loop"
            title="Approvals before it burns money."
            sub="Circuit breaker for runaways. You keep the keys. You keep the repo."
          />
        </div>
      </Scene>

      <Scene from={960} until={1140}>
        <div
          style={{
            padding: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            gap: 36,
          }}
        >
          <Title from={970} kicker="Twelve engines" title="Your subscriptions. Not a new bill." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8, maxWidth: 920 }}>
            {['Claude Code', 'Codex', 'Gemini', 'Cursor', 'Copilot', 'Grok', 'Ollama', 'OpenCode'].map(
              (label, i) => (
                <Pill key={label} label={label} delay={990 + i * 6} />
              )
            )}
          </div>
        </div>
      </Scene>

      <Scene from={1140} until={1320}>
        <div
          style={{
            padding: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'flex-start',
          }}
        >
          <Title
            from={1150}
            kicker="Free · open source"
            title="Clock in your clone."
            sub="macOS, Windows, Linux. github.com/SuchitraSwain/The-Swain-Office"
          />
        </div>
      </Scene>
    </AbsoluteFill>
  );
};
