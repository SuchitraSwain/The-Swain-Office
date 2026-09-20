import React from 'react';
import { Composition } from 'remotion';
import { FPS } from './theme';
import { HowAgents } from './HowAgents';
import { HowMemPalace } from './HowMemPalace';
import { HowGodHive } from './HowGodHive';
import { HeroFallback } from './HeroFallback';
import { LinkedInReel } from './LinkedInReel';
import { AppWalkthrough } from './AppWalkthrough';

// 16:9 clips sized to match the landing page's video frames.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="HowAgents" component={HowAgents} durationInFrames={180} fps={FPS} width={1920} height={1080} />
    <Composition id="HowMemPalace" component={HowMemPalace} durationInFrames={180} fps={FPS} width={1920} height={1080} />
    <Composition id="HowGodHive" component={HowGodHive} durationInFrames={180} fps={FPS} width={1920} height={1080} />
    <Composition id="HeroFallback" component={HeroFallback} durationInFrames={450} fps={FPS} width={1920} height={1080} />
    <Composition id="LinkedInReel" component={LinkedInReel} durationInFrames={1320} fps={FPS} width={1080} height={1080} />
    <Composition id="AppWalkthrough" component={AppWalkthrough} durationInFrames={2080} fps={FPS} width={1920} height={1080} />
  </>
);
