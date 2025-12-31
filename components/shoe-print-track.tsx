"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type Rand = () => number

function mulberry32(seed: number): Rand {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashStringToSeed(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/* CHANGED: background now matches your screenshot */
const matchedBg: React.CSSProperties = {
  backgroundColor: "#050505",
  backgroundImage: `
    radial-gradient(1200px 260px at 50% 120%, rgba(255,255,255,0.06), transparent 60%),
    radial-gradient(900px 220px at 50% -10%, rgba(255,255,255,0.03), transparent 70%),
    repeating-linear-gradient(115deg,
      rgba(255,255,255,0.035) 0px,
      rgba(255,255,255,0.035) 26px,
      rgba(0,0,0,0) 26px,
      rgba(0,0,0,0) 56px
    ),
    repeating-linear-gradient(115deg,
      rgba(0,0,0,0.35) 0px,
      rgba(0,0,0,0.35) 56px,
      rgba(0,0,0,0) 56px,
      rgba(0,0,0,0) 112px
    )
  `,
  backgroundBlendMode: "soft-light, soft-light, normal, normal",
}

function ShoePrintMark({
  id,
  color,
  maskId,
}: {
  id: string
  color: string
  maskId: string
}) {
  return (
    <g style={{ color }}>
      <path
        d="
          M 42 10
          C 28 22, 20 42, 20 64
          C 20 92, 26 118, 30 142
          C 34 166, 34 184, 30 206
          C 26 228, 34 246, 54 256
          C 66 262, 78 262, 90 256
          C 110 246, 118 228, 114 206
          C 110 184, 110 166, 114 142
          C 118 118, 124 92, 124 64
          C 124 42, 116 22, 102 10
          C 86 -4, 58 -4, 42 10
          Z
        "
        fill="currentColor"
        opacity="0.92"
        mask={`url(#${maskId})`}
        filter={`url(#inkGrain-${id})`}
      />

      <path
        d="
          M 42 10
          C 28 22, 20 42, 20 64
          C 20 92, 26 118, 30 142
          C 34 166, 34 184, 30 206
          C 26 228, 34 246, 54 256
          C 66 262, 78 262, 90 256
          C 110 246, 118 228, 114 206
          C 110 184, 110 166, 114 142
          C 118 118, 124 92, 124 64
          C 124 42, 116 22, 102 10
          C 86 -4, 58 -4, 42 10
          Z
        "
        fill="currentColor"
        opacity="0.14"
        mask={`url(#${maskId})`}
        filter={`url(#edgeRough-${id})`}
      />

      <ellipse
        cx="72"
        cy="224"
        rx="38"
        ry="22"
        fill="currentColor"
        opacity="0.33"
        mask={`url(#${maskId})`}
        filter={`url(#inkGrain-${id})`}
      />

      <ellipse
        cx="72"
        cy="68"
        rx="44"
        ry="26"
        fill="currentColor"
        opacity="0.22"
        mask={`url(#${maskId})`}
        filter={`url(#inkGrain-${id})`}
      />
    </g>
  )
}

export function ShoePrintTrack() {
  const colors = ["#eef1f6", "#d9dee7", "#c7ccd6", "#f6f7fa", "#b9bec9"]

  const prints = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      variant: i % 3,
      x: 52 + (i % 2 === 0 ? -28 : 28) + Math.sin(i * 0.55) * 16,
      y: i * 82 + 34,
      rotation: i % 2 === 0 ? -14 : 14,
      delay: i * 0.09,
      scale: 0.70 + (i % 3) * 0.02,
    }))
  }, [])

  const splatters = useMemo(() => {
    return prints.flatMap((p, i) => {
      const rand = mulberry32(hashStringToSeed(`shoe-track-splatters-${p.id}-v7`))
      const count = 3 + Math.floor(rand() * 5)
      return Array.from({ length: count }, (_, k) => ({
        key: `spl-${i}-${k}`,
        cx: p.x + 30 + rand() * 70 - 35,
        cy: p.y + 10 + rand() * 90,
        r: 1.2 + rand() * 5.2,
        fill: colors[(i + 2 + k) % colors.length],
        opacity: 0.06 + rand() * 0.14,
        delay: p.delay + 0.12 + k * 0.03,
      }))
    })
  }, [prints])

  return (
    <div className="relative w-full h-full overflow-hidden" style={matchedBg}>
      <svg viewBox="0 0 200 1050" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="treadMaskV-0">
            <rect x="0" y="0" width="160" height="280" fill="white" />
            <ellipse cx="72" cy="70" rx="40" ry="22" fill="none" stroke="black" strokeWidth="8" />
            <ellipse cx="72" cy="92" rx="32" ry="18" fill="none" stroke="black" strokeWidth="7" />
            <ellipse cx="72" cy="110" rx="24" ry="14" fill="none" stroke="black" strokeWidth="6" />
            {Array.from({ length: 6 }, (_, r) =>
              Array.from({ length: 4 }, (_, c) => (
                <rect
                  key={`waffle0-${r}-${c}`}
                  x={48 + c * 14}
                  y={132 + r * 14}
                  width="10"
                  height="10"
                  rx="3"
                  fill="black"
                />
              )),
            )}
            <path d="M38 186 C56 170 88 170 106 186" stroke="black" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M42 208 C60 194 84 194 102 208" stroke="black" strokeWidth="9" strokeLinecap="round" fill="none" />
            <path d="M36 240 L72 212 L108 240" stroke="black" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M30 266 L72 238 L114 266" stroke="black" strokeWidth="11" strokeLinecap="round" fill="none" />
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={`cut0L-${i}`} x={18} y={98 + i * 16} width="10" height="11" rx="3" fill="black" />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={`cut0R-${i}`} x={118} y={98 + i * 16} width="10" height="11" rx="3" fill="black" />
            ))}
          </mask>

          <mask id="treadMaskV-1">
            <rect x="0" y="0" width="160" height="280" fill="white" />
            {Array.from({ length: 11 }, (_, i) => (
              <path
                key={`hb1-${i}`}
                d={`M38 ${86 + i * 14} L72 ${72 + i * 14} L106 ${86 + i * 14}`}
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
            ))}
            <path d="M34 56 C52 40 92 40 110 56" stroke="black" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M40 40 C58 28 86 28 104 40" stroke="black" strokeWidth="7" strokeLinecap="round" fill="none" />
            <rect x="42" y="210" width="60" height="42" rx="18" fill="black" />
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={`dot1L-${i}`} cx={26} cy={88 + i * 12} r={3.5} fill="black" />
            ))}
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={`dot1R-${i}`} cx={130} cy={88 + i * 12} r={3.5} fill="black" />
            ))}
          </mask>

          <mask id="treadMaskV-2">
            <rect x="0" y="0" width="160" height="280" fill="white" />
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 4 }, (_, c) => (
                <path
                  key={`hex2-${r}-${c}`}
                  d={`
                    M ${54 + c * 18} ${108 + r * 18}
                    l 7 -4 7 4 0 8 -7 4 -7 -4 Z
                  `}
                  fill="black"
                />
              )),
            )}
            <ellipse cx="72" cy="74" rx="38" ry="22" fill="none" stroke="black" strokeWidth="8" />
            <ellipse cx="72" cy="96" rx="30" ry="18" fill="none" stroke="black" strokeWidth="7" />
            <path d="M34 178 C54 160 90 160 110 178" stroke="black" strokeWidth="12" strokeLinecap="round" fill="none" />
            {Array.from({ length: 5 }, (_, i) => (
              <rect key={`rib2-${i}`} x={44} y={214 + i * 9} width="56" height="5" rx="3" fill="black" />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={`cut2L-${i}`} x={18} y={94 + i * 16} width="11" height="12" rx="3" fill="black" />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={`cut2R-${i}`} x={118} y={94 + i * 16} width="11" height="12" rx="3" fill="black" />
            ))}
          </mask>

          <filter id="paperGrain" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="n" />
            <feColorMatrix in="n" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
          </filter>
        </defs>

        <rect x="0" y="0" width="200" height="1050" fill="transparent" filter="url(#paperGrain)" />

        {prints.map((print) => {
          const maskId = `treadMaskV-${print.variant}`
          const seedA = (print.id * 11 + 7) % 97
          const seedB = (print.id * 13 + 19) % 101

          return (
            <motion.g
              key={print.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: print.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <defs>
                <filter id={`inkGrain-${print.id}`} x="-35%" y="-35%" width="170%" height="170%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed={seedA} result="noise" />
                  <feColorMatrix
                    in="noise"
                    type="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.55 0
                    "
                    result="alphaNoise"
                  />
                  <feComposite in="SourceGraphic" in2="alphaNoise" operator="arithmetic" k1="0" k2="1" k3="0.34" k4="0" />
                </filter>

                <filter id={`edgeRough-${print.id}`} x="-35%" y="-35%" width="170%" height="170%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="1" seed={seedB} result="t" />
                  <feDisplacementMap in="SourceGraphic" in2="t" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
                  <feGaussianBlur stdDeviation="0.12" />
                </filter>
              </defs>

              <g transform={`translate(${print.x}, ${print.y}) rotate(${print.rotation}) scale(${print.scale})`}>
                <ShoePrintMark id={`${print.id}`} color={print.color} maskId={maskId} />
              </g>
            </motion.g>
          )
        })}

        {splatters.map((s) => (
          <motion.circle
            key={s.key}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.fill}
            opacity={s.opacity}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: s.delay, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>
    </div>
  )
}

export function ShoePrintDivider() {
  const colors = ["#eef1f6", "#d9dee7", "#c7ccd6", "#f6f7fa", "#b9bec9"]

  const trail = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      key: i,
      x: i * 74 + 34,
      y: 108 + (i % 2 === 0 ? -18 : 18),
      rot: 90 + (i % 2 === 0 ? -10 : 10),
      color: colors[i % colors.length],
      delay: i * 0.04,
      scale: 0.48,
      variant: i % 3,
    }))
  }, [])

  const dots = useMemo(() => {
    const rand = mulberry32(hashStringToSeed("shoe-divider-dots-v7"))
    return Array.from({ length: 28 }, (_, i) => ({
      key: `dot-${i}`,
      cx: 40 + i * 42 + rand() * 18,
      cy: 46 + rand() * 110,
      r: 1.5 + rand() * 3.6,
      fill: colors[i % colors.length],
      opacity: 0.10 + rand() * 0.22,
      delay: i * 0.015,
    }))
  }, [])

  return (
    <div className="relative w-full h-[120px] md:h-[160px] lg:h-[200px] overflow-hidden" style={matchedBg}>
      <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="treadMaskH-0">
            <rect x="0" y="0" width="160" height="280" fill="white" />
            <ellipse cx="72" cy="70" rx="40" ry="22" fill="none" stroke="black" strokeWidth="8" />
            <ellipse cx="72" cy="92" rx="32" ry="18" fill="none" stroke="black" strokeWidth="7" />
            <ellipse cx="72" cy="110" rx="24" ry="14" fill="none" stroke="black" strokeWidth="6" />
          </mask>

          <mask id="treadMaskH-1">
            <rect x="0" y="0" width="160" height="280" fill="white" />
            {Array.from({ length: 10 }, (_, i) => (
              <path
                key={`hbH-${i}`}
                d={`M40 ${90 + i * 14} L72 ${76 + i * 14} L104 ${90 + i * 14}`}
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </mask>

          <mask id="treadMaskH-2">
            <rect x="0" y="0" width="160" height="280" fill="white" />
            {Array.from({ length: 6 }, (_, r) =>
              Array.from({ length: 4 }, (_, c) => (
                <path
                  key={`hexH-${r}-${c}`}
                  d={`
                    M ${54 + c * 18} ${108 + r * 18}
                    l 7 -4 7 4 0 8 -7 4 -7 -4 Z
                  `}
                  fill="black"
                />
              )),
            )}
          </mask>
        </defs>

        {trail.map((p) => {
          const maskId = `treadMaskH-${p.variant}`
          const seedA = (p.key * 11 + 7) % 97
          const seedB = (p.key * 13 + 19) % 101

          return (
            <motion.g
              key={p.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <defs>
                <filter id={`inkGrainH-${p.key}`} x="-35%" y="-35%" width="170%" height="170%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed={seedA} result="noise" />
                  <feColorMatrix
                    in="noise"
                    type="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.55 0
                    "
                    result="alphaNoise"
                  />
                  <feComposite in="SourceGraphic" in2="alphaNoise" operator="arithmetic" k1="0" k2="1" k3="0.34" k4="0" />
                </filter>

                <filter id={`edgeRoughH-${p.key}`} x="-35%" y="-35%" width="170%" height="170%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="1" seed={seedB} result="t" />
                  <feDisplacementMap in="SourceGraphic" in2="t" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
                  <feGaussianBlur stdDeviation="0.12" />
                </filter>
              </defs>

              <g transform={`translate(${p.x}, ${p.y}) rotate(${p.rot}) scale(${p.scale})`} style={{ color: p.color }}>
                <path
                  d="
                    M 42 10
                    C 28 22, 20 42, 20 64
                    C 20 92, 26 118, 30 142
                    C 34 166, 34 184, 30 206
                    C 26 228, 34 246, 54 256
                    C 66 262, 78 262, 90 256
                    C 110 246, 118 228, 114 206
                    C 110 184, 110 166, 114 142
                    C 118 118, 124 92, 124 64
                    C 124 42, 116 22, 102 10
                    C 86 -4, 58 -4, 42 10
                    Z
                  "
                  fill="currentColor"
                  opacity="0.92"
                  mask={`url(#${maskId})`}
                  filter={`url(#inkGrainH-${p.key})`}
                />
                <path
                  d="
                    M 42 10
                    C 28 22, 20 42, 20 64
                    C 20 92, 26 118, 30 142
                    C 34 166, 34 184, 30 206
                    C 26 228, 34 246, 54 256
                    C 66 262, 78 262, 90 256
                    C 110 246, 118 228, 114 206
                    C 110 184, 110 166, 114 142
                    C 118 118, 124 92, 124 64
                    C 124 42, 116 22, 102 10
                    C 86 -4, 58 -4, 42 10
                    Z
                  "
                  fill="currentColor"
                  opacity="0.14"
                  mask={`url(#${maskId})`}
                  filter={`url(#edgeRoughH-${p.key})`}
                />
              </g>
            </motion.g>
          )
        })}

        {dots.map((d) => (
          <motion.circle
            key={d.key}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={d.fill}
            opacity={d.opacity}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: d.delay, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
        ))}
      </svg>
    </div>
  )
}
