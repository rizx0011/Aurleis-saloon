import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm, cinematic golden harmonic frequencies (lounge drone: D2, A2, D3, F#3)
      const frequencies = [73.42, 110.0, 146.83, 185.0];
      const newOscs: OscillatorNode[] = [];

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle frequency drift for warmth
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + index * 0.05, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) {
          panner.pan.setValueAtTime((index % 2 === 0 ? -0.4 : 0.4), ctx.currentTime);
          osc.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(masterGain);
        }

        osc.start();
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
      setIsPlaying(true);
    } catch {
      // AudioContext not allowed or failed
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        oscillatorsRef.current = [];
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1300);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`ambient-sound-toggle ${isPlaying ? 'playing' : ''}`}
      aria-label={isPlaying ? 'Mute cinematic lounge ambiance' : 'Play cinematic lounge ambiance'}
      title={isPlaying ? 'Mute cinematic lounge ambiance' : 'Experience cinematic salon ambiance'}
      data-testid="button-ambient-sound"
    >
      {isPlaying ? (
        <>
          <span className="sound-wave-bars" aria-hidden="true">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </span>
          <Volume2 size={15} />
          <span className="sound-label">Atmosphere: ON</span>
        </>
      ) : (
        <>
          <VolumeX size={15} />
          <span className="sound-label">Atmosphere: OFF</span>
        </>
      )}
    </button>
  );
}
