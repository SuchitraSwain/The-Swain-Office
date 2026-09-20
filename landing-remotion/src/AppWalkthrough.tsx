import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const D = {
  paper: '#221F1B',
  card: '#2A2723',
  ink: '#F3EEE6',
  muted: '#D2CBC0',
  gold: '#C9A85A',
  line: '#4A453E',
} as const;

const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif';

const TitleCard: React.FC<{ kicker: string; title: string; sub?: string }> = ({
  kicker,
  title,
  sub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, mass: 0.7 } });
  return (
    <AbsoluteFill
      style={{
        background: D.paper,
        justifyContent: 'center',
        padding: '0 96px',
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: D.gold,
          marginBottom: 16,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: D.ink,
        }}
      >
        {title}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 500,
            color: D.muted,
            marginTop: 16,
          }}
        >
          {sub}
        </div>
      )}
    </AbsoluteFill>
  );
};

const LowerThird: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, mass: 0.65 } });
  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        bottom: 40,
        maxWidth: 820,
        padding: '16px 22px 18px',
        borderRadius: 14,
        background: 'rgba(34,31,27,0.88)',
        border: `1px solid ${D.line}`,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: D.gold,
          marginBottom: 6,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: D.ink,
        }}
      >
        {title}
      </div>
    </div>
  );
};

/** Flip the light-theme recordings into After Hours taupe. */
const AFTER_HOURS =
  'invert(1) hue-rotate(180deg) saturate(0.58) brightness(0.76) contrast(0.92) sepia(0.32)';

const FeatureClip: React.FC<{
  src: string;
  startFrom: number;
  length: number;
  kicker: string;
  title: string;
  cropWebcam?: boolean;
}> = ({ src, startFrom, length, kicker, title, cropWebcam = false }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [length - 8, length], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: D.paper, opacity: Math.min(fadeIn, fadeOut) }}>
      <div
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 36,
          bottom: 36,
          borderRadius: 16,
          overflow: 'hidden',
          border: `1px solid ${D.line}`,
          background: D.card,
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          startFrom={startFrom}
          muted
          volume={0}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: cropWebcam ? '40% 8%' : 'center',
            transform: cropWebcam ? 'scale(1.32)' : 'scale(1.02)',
            filter: AFTER_HOURS,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(34,31,27,0.18)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <LowerThird kicker={kicker} title={title} />
    </AbsoluteFill>
  );
};

/**
 * Real screen-recording walkthrough: floor → orchestrator → hire → hive.
 * Composition is 30fps; floor.mp4 is 60fps, the rest are 30fps.
 */
export const AppWalkthrough: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: D.paper }}>
      <Sequence from={0} durationInFrames={50}>
        <TitleCard
          kicker="The Swain Office · After Hours"
          title="How the app works."
          sub="An office of AI agents. On your laptop."
        />
      </Sequence>

      <Sequence from={50} durationInFrames={420}>
        <FeatureClip
          src="clips/floor.mp4"
          startFrom={90}
          length={420}
          kicker="01 · The floor"
          title="They sit at desks. They walk the floor."
        />
      </Sequence>

      <Sequence from={470} durationInFrames={600}>
        <FeatureClip
          src="clips/orchestrator.mp4"
          startFrom={60}
          length={600}
          cropWebcam
          kicker="02 · Orchestrator"
          title="You talk to one boss. He runs the floor."
        />
      </Sequence>

      <Sequence from={1070} durationInFrames={390}>
        <FeatureClip
          src="clips/hire.mp4"
          startFrom={20}
          length={390}
          cropWebcam
          kicker="03 · Hire"
          title="Pick an engine. Spawn a desk."
        />
      </Sequence>

      <Sequence from={1460} durationInFrames={510}>
        <FeatureClip
          src="clips/features.mp4"
          startFrom={90}
          length={510}
          cropWebcam
          kicker="04 · The hive"
          title="Tasks, memory, graph, schedules."
        />
      </Sequence>

      <Sequence from={1970} durationInFrames={110}>
        <TitleCard
          kicker="Free · open source"
          title="Clock in your clone."
          sub="macOS, Windows, Linux · github.com/SuchitraSwain/The-Swain-Office"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
