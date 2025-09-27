import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Keyboard, EffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'
import { gsap } from 'gsap'
import newtonSVG from './assets/newton.svg'
import subscribeBadge from './assets/subscribe-badge.svg'

const mandalaLayers = [
  {
    style: {
      width: '640px',
      height: '640px',
      top: '-18%',
      left: '-8%',
      '--duration': '55s',
      '--floatDur': '22s',
      '--opacity': '0.58'
    }
  },
  {
    style: {
      width: '520px',
      height: '520px',
      top: '60%',
      left: '72%',
      '--duration': '68s',
      '--floatDur': '18s',
      '--opacity': '0.45'
    }
  },
  {
    style: {
      width: '440px',
      height: '440px',
      top: '8%',
      left: '62%',
      '--duration': '75s',
      '--floatDur': '26s',
      '--opacity': '0.5'
    }
  },
  {
    style: {
      width: '360px',
      height: '360px',
      top: '68%',
      left: '-12%',
      '--duration': '58s',
      '--floatDur': '16s',
      '--opacity': '0.52'
    }
  }
]

const mandalaOrbs = [
  {
    style: {
      width: '260px',
      height: '260px',
      top: '12%',
      left: '-4%',
      '--floatDur': '16s',
      '--opacity': '0.38'
    }
  },
  {
    style: {
      width: '220px',
      height: '220px',
      top: '68%',
      left: '68%',
      '--floatDur': '14s',
      '--opacity': '0.42'
    }
  },
  {
    style: {
      width: '180px',
      height: '180px',
      top: '38%',
      left: '82%',
      '--floatDur': '12s',
      '--opacity': '0.35'
    }
  }
]

function useEnterAnimation(deps=[]){
  const scope = useRef(null)
  useEffect(()=>{
    const ctx = gsap.context(()=>{
      const tl = gsap.timeline()
      tl.from('.h1', {y:40, opacity:0, duration:0.8, ease:'back.out'})
        .from('.kicker, .deck', {y:20, opacity:0, duration:0.6, stagger:0.08}, '-=0.3')
        .from('.btn', {scale:0.8, opacity:0, duration:0.4, stagger:0.06}, '-=0.2')
    }, scope)
    return () => ctx.revert()
  }, deps)
  return scope
}

function TitleSlide(){
  const scope = useEnterAnimation([])
  useEffect(()=>{
    gsap.to('.planet', {rotation:360, repeat:-1, duration:50, ease:'none'})
  },[])
  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1"><span className="punch">Physics</span> is how the universe keeps receipts.</h1>
          <p className="kicker">We study <b>matter</b>, <b>energy</b>, <b>motion</b>, and the rules that make reality tick.</p>
        </div>
        <div className="stage">
          <div className="mandala-halo halo-one" />
          <div className="mandala-halo halo-two" />
          <svg className="planet" width="220" height="220" viewBox="0 0 220 220">
            <defs>
              <radialGradient id="g" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fff"/>
                <stop offset="20%" stopColor="#93c5fd"/>
                <stop offset="60%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#1e40af"/>
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="100" fill="url(#g)"/>
            <ellipse cx="110" cy="110" rx="120" ry="42" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="6"/>
          </svg>
        </div>
        <div className="row">
          <button className="btn" onClick={()=>window.alert('Swipe or use arrow keys!')}>How to play</button>
          <span className="label">Swipe / Arrow Keys / Click nav</span>
        </div>
      </div>
    </div>
  )
}

function DefinitionSlide(){
  const scope = useEnterAnimation([])
  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">What is <span className="punch">Physics</span>?</h1>
          <p className="deck">It's the <b>science of patterns in nature</b> -- from falling apples to exploding stars. We build <b>models</b> that predict what happens and test them against the real world.</p>
        </div>
        <div className="row" style={{justifyContent:'space-between'}}>
          <div className="card">
            <div> <b>Matter</b> -- stuff & structure</div>
            <div>! <b>Energy</b> -- ability to do work</div>
            <div>-- <b>Motion</b> -- position changing</div>
            <div> <b>Models</b> -- math + logic</div>
          </div>
          <div className="card">
            <div> <b>Method</b>: Observe - Hypothesize - Predict - Test - Revise.</div>
            <div className="label">A workflow more disciplined than a monk's morning routine.</div>
          </div>
        </div>
        <div className="row"><span className="label">Tip: tap the next slide to try a tiny gravity lab.</span></div>
      </div>
    </div>
  )
}

function GravitySlide(){
  const scope = useEnterAnimation([])
  const ballRef = useRef(null)
  const [g, setG] = useState(9.8)

  const drop = ()=>{
    const ball = ballRef.current
    gsap.killTweensOf(ball)
    gsap.set(ball, {y:0})
    const height = 280
    const t = Math.sqrt(2*height/g) // s (toy)
    gsap.to(ball, {y:height, duration:Math.max(0.35, t/3), ease:'power2.in'})
  }

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Gravity: things fall because spacetime <span className="punch">curves</span>.</h1>
          <p className="kicker">Change the strength of gravity and drop the ball.</p>
        </div>
        <div className="stage">
          <div ref={ballRef} className="ball" />
          <div className="ground" />
        </div>
        <div className="row">
          <label className="label">g = {g.toFixed(1)} m/s^2</label>
          <input className="input" type="range" min="1.6" max="24.8" step="0.1" value={g} onChange={e=>setG(parseFloat(e.target.value))} />
          <button className="btn" onClick={drop}>Drop</button>
          <span className="label">Try Moon (~1.6) vs Jupiter (~24.8).</span>
        </div>
      </div>
    </div>
  )
}

function MotionSlide(){
  const scope = useEnterAnimation([])
  const rocketRef = useRef(null)
  const flameRef = useRef(null)
  const [mode, setMode] = useState('uniform') // or accelerate

  useEffect(()=>{
    gsap.set(flameRef.current, {opacity:0})
  },[])

  const fly = ()=>{
    const rocket = rocketRef.current
    const flame = flameRef.current
    gsap.killTweensOf([rocket, flame])
    gsap.set(rocket, {x:0})
    if(mode==='uniform'){
      gsap.to(rocket, {x:600, duration:3, ease:'none'})
    }else{
      gsap.to(rocket, {x:600, duration:3, ease:'power2.in'})
    }
    gsap.to(flame, {opacity:1, yoyo:true, repeat:-1, duration:0.2})
  }

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Motion: <span className="punch">{mode==='uniform'?'steady':'speeding up'}</span> travel.</h1>
          <p className="kicker">Switch modes and launch.</p>
        </div>
        <div className="stage">
          <div ref={rocketRef} className="rocket">
            <div ref={flameRef} className="flame" />
          </div>
          <div className="ground" />
        </div>
        <div className="row">
          <button className="btn" onClick={()=>setMode(mode==='uniform'?'accelerate':'uniform')}>Mode: {mode}</button>
          <button className="btn" onClick={fly}>Launch!</button>
          <span className="label">Uniform = constant speed, Accelerate = speed increases.</span>
        </div>
      </div>
    </div>
  )
}

function ForceSlide(){
  const scope = useEnterAnimation([])
  const boxRef = useRef(null)
  const [pushing, setPushing] = useState(false)
  const [v, setV] = useState(0)

  useEffect(()=>{
    const id = gsap.ticker.add(()=>{
      let vel = v
      if(pushing) vel += 0.12  // apply force
      vel *= 0.985             // friction
      setV(vel)
      gsap.set(boxRef.current, {x:`+=${vel}`})
    })
    return () => { gsap.ticker.remove(id) }
  }, [pushing, v])

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Forces: pushes, pulls, and <span className="punch">friction</span>.</h1>
          <p className="kicker">Hold "Push" to accelerate; release to watch friction slow it.</p>
        </div>
        <div className="stage">
          <div ref={boxRef} className="box"></div>
          <div className="ground" />
        </div>
        <div className="row">
          <button className="btn" onMouseDown={()=>setPushing(true)} onMouseUp={()=>setPushing(false)} onTouchStart={()=>setPushing(true)} onTouchEnd={()=>setPushing(false)}>Push go!</button>
          <span className="label">Velocity: {v.toFixed(2)} px/tick</span>
        </div>
      </div>
    </div>
  )
}

function EnergySlide(){
  const scope = useEnterAnimation([])
  const ballRef = useRef(null)
  const [h, setH] = useState(120)

  const dropBounce = ()=>{
    const ball = ballRef.current
    const y = (h/160)*260
    const tl = gsap.timeline({defaults:{ease:'power2.in'}})
    gsap.set(ball, {y:0})
    tl.to(ball, {y:y, duration:0.7})
      .to(ball, {y:y*0.4, duration:0.4, ease:'power2.out'})
      .to(ball, {y:y, duration:0.35})
      .to(ball, {y:y*0.55, duration:0.25, ease:'power2.out'})
      .to(ball, {y:y, duration:0.2})
  }

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Energy: height - speed. <span className="punch">Potential</span> becomes <span className="punch">kinetic</span>.</h1>
          <p className="kicker">Raise the starting height, then bounce.</p>
        </div>
        <div className="stage">
          <div ref={ballRef} className="ball" style={{background:'radial-gradient(circle at 30% 30%, #fff 0%, #fbcfe8 18%, #f472b6 38%, #a21caf 70%)'}} />
          <div className="ground" />
        </div>
        <div className="row">
          <label className="label">Height: {h}px</label>
          <input className="input" type="range" min="40" max="160" step="5" value={h} onChange={(e)=>setH(parseInt(e.target.value))}/>
          <button className="btn" onClick={dropBounce}>Bounce *</button>
        </div>
      </div>
    </div>
  )
}

function PendulumSlide(){
  const scope = useEnterAnimation([])
  const armRef = useRef(null)
  const [length, setLength] = useState(140)

  useEffect(()=>{
    const arm = armRef.current
    if(!arm) return
    gsap.set(arm, {transformOrigin:'top center', rotation:0})
  },[])

  const period = Math.sqrt(length/100) * 2

  const swing = ()=>{
    const arm = armRef.current
    if(!arm) return
    const duration = Math.max(0.9, period/1.3)
    gsap.killTweensOf(arm)
    gsap.fromTo(arm,
      {rotation:-24},
      {
        rotation:24,
        duration:duration,
        ease:'sine.inOut',
        yoyo:true,
        repeat:5,
        onComplete:()=>{
          gsap.to(arm, {rotation:0, duration:0.5, ease:'sine.out'})
        }
      }
    )
  }

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Pendulums swing with <span className="punch">groove</span>.</h1>
          <p className="kicker">Stretch the string to change the tempo, then let it dance.</p>
        </div>
        <div className="stage pendulum-stage">
          <div className="pendulum-pivot" />
          <div
            ref={armRef}
            className="pendulum"
            style={{'--pendulum-length': `${length}px`}}
          >
            <div className="pendulum-rod" />
            <div className="pendulum-bob" />
          </div>
          <div className="pendulum-shadow" />
        </div>
        <div className="row pendulum-controls">
          <label className="label">Length: {length}px</label>
          <input
            className="input"
            type="range"
            min="80"
            max="200"
            value={length}
            onChange={e=>setLength(parseInt(e.target.value, 10))}
          />
          <span className="label">Period approx {period.toFixed(2)} s</span>
          <button className="btn" onClick={swing}>Swing it</button>
        </div>
      </div>
    </div>
  )
}

function MagnetSlide(){
  const scope = useEnterAnimation([])
  const stageRef = useRef(null)
  const magnetRef = useRef(null)
  const [active, setActive] = useState(true)
  const [reversed, setReversed] = useState(false)

  useEffect(()=>{
    const stage = stageRef.current
    if(!stage) return
    const ctx = gsap.context(()=>{
      gsap.set('.magnet-line', {transformOrigin:'center bottom', scaleY:0.25, opacity:0.14})
    }, stage)
    return () => ctx.revert()
  },[])

  useEffect(()=>{
    const stage = stageRef.current
    if(!stage) return
    const ctx = gsap.context(()=>{
      const lines = gsap.utils.toArray('.magnet-line')
      if(active){
        lines.forEach((line, idx)=>{
          gsap.fromTo(line,
            {scaleY:0.28, opacity:0.18},
            {
              scaleY:1 + idx*0.08,
              opacity:0.78,
              duration:0.6,
              ease:'back.out(2)',
              delay:idx*0.05
            }
          )
          gsap.to(line, {
            scaleY:1 + idx*0.08,
            duration:1.6 + idx*0.18,
            repeat:-1,
            yoyo:true,
            ease:'sine.inOut',
            delay:0.6 + idx*0.07
          })
        })
      }else{
        gsap.to(lines, {scaleY:0.2, opacity:0.12, duration:0.4, ease:'power1.out'})
      }
    }, stage)
    return () => ctx.revert()
  }, [active])

  useEffect(()=>{
    const magnet = magnetRef.current
    if(!magnet) return
    gsap.to(magnet, {
      rotationY: reversed? 180 : 0,
      duration:0.6,
      ease:'power2.inOut'
    })
  }, [reversed])

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Magnets make invisible <span className="punch">loops</span>.</h1>
          <p className="kicker">Flip the poles or power to sculpt glowing field lines.</p>
        </div>
        <div ref={stageRef} className={`stage magnet-stage ${active ? 'on' : 'off'}`}>
          <div className="magnet-field">
            {[...Array(6)].map((_,i)=> (
              <div key={i} className="magnet-line" style={{'--index': i}} />
            ))}
          </div>
          <div ref={magnetRef} className={`magnet ${reversed ? 'reversed' : ''}`}>
            <div className="magnet-pole magnet-n">{reversed ? 'S' : 'N'}</div>
            <div className="magnet-core" />
            <div className="magnet-pole magnet-s">{reversed ? 'N' : 'S'}</div>
          </div>
        </div>
        <div className="row magnet-controls">
          <button className="btn" onClick={()=>setActive(v=>!v)}>{active? 'Field: ON' : 'Field: OFF'}</button>
          <button className="btn" onClick={()=>setReversed(v=>!v)}>Flip poles</button>
          <span className="label">Lines flow from N - S{reversed ? ' (flipped!)' : ''}</span>
        </div>
      </div>
    </div>
  )
}

function LightMixSlide(){
  const scope = useEnterAnimation([])
  const orbRef = useRef(null)
  const [rgb, setRgb] = useState({r:120, g:140, b:255})

  const update = (key)=>(e)=>{
    const value = parseInt(e.target.value, 10)
    setRgb(prev=>({...prev, [key]: value}))
  }

  const randomize = ()=>{
    setRgb({
      r: Math.floor(Math.random()*256),
      g: Math.floor(Math.random()*256),
      b: Math.floor(Math.random()*256)
    })
  }

  const {r,g,b} = rgb
  const mix = `rgb(${r}, ${g}, ${b})`
  const hex = '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase()

  useEffect(()=>{
    const orb = orbRef.current
    if(!orb) return
    gsap.fromTo(orb, {scale:0.92}, {scale:1, duration:0.5, ease:'elastic.out(1,0.6)'})
  }, [r,g,b])

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Blend light into a <span className="punch">custom</span> glow.</h1>
          <p className="kicker">Tweak RGB sliders or roll the dice for surprise auroras.</p>
        </div>
        <div className="stage lightmix-stage">
          <div
            ref={orbRef}
            className="light-orb"
            style={{
              background:`radial-gradient(circle at 32% 26%, #fff 0%, ${mix} 45%, rgba(${r}, ${g}, ${b}, 0.12) 100%)`,
              boxShadow:`0 0 90px rgba(${r}, ${g}, ${b}, 0.55)`
            }}
          />
          <div className="light-orb-ring" style={{borderColor:`rgba(${r}, ${g}, ${b}, 0.55)`}} />
        </div>
        <div className="lightmix-panel">
          {['r','g','b'].map((key)=>{
            const labels = {r:'Red', g:'Green', b:'Blue'}
            return (
              <div key={key} className="slider-group">
                <label className="label">{labels[key]} {rgb[key]}</label>
                <input
                  className="input"
                  type="range"
                  min="0"
                  max="255"
                  value={rgb[key]}
                  onChange={update(key)}
                />
              </div>
            )
          })}
          <div className="row" style={{marginTop:'12px'}}>
            <span className="label">Current mix: {mix} ({hex})</span>
            <button className="btn" onClick={randomize}>Randomize</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function WaveSlide(){
  const scope = useEnterAnimation([])
  const [amp, setAmp] = useState(20)
  const [freq, setFreq] = useState(8)
  const pathRef = useRef(null)

  useEffect(()=>{
    const svg = pathRef.current
    const width = 1000
    const height = 160
    const points = 120
    const update = ()=>{
      let d = ''
      for(let i=0;i<=points;i++){
        const x = (i/points)*width
        const y = height/2 + Math.sin((i/points)*Math.PI*freq)*amp
        d += `${i===0?'M':'L'} ${x} ${y} `
      }
      svg.setAttribute('d', d)
    }
    update()
  }, [amp, freq])

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Waves: patterns that move <span className="punch">without stuff</span> moving far.</h1>
          <p className="kicker">Tweak amplitude (tallness) and frequency (squishiness).</p>
        </div>
        <div className="stage">
          <div className="wave">
            <svg viewBox="0 0 1000 160" preserveAspectRatio="none">
              <path ref={pathRef} d="" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <div className="row">
          <label className="label">Amplitude</label>
          <input className="input" type="range" min="4" max="50" value={amp} onChange={e=>setAmp(parseInt(e.target.value))} />
          <label className="label">Frequency</label>
          <input className="input" type="range" min="2" max="20" value={freq} onChange={e=>setFreq(parseInt(e.target.value))} />
        </div>
      </div>
    </div>
  )
}

function NewtonSlide(){
  const scope = useEnterAnimation([])
  const appleRef = useRef(null)
  const artRef = useRef(null)

  useEffect(()=>{
    // gentle float for art
    gsap.to(artRef.current, {y:-6, repeat:-1, yoyo:true, duration:3, ease:'sine.inOut'})
  },[])

  const dropApple = ()=>{
    const a = appleRef.current
    gsap.killTweensOf(a)
    gsap.set(a, {y:-120, x:240, rotation:0, scale:1})
    const tl = gsap.timeline()
    tl.to(a, {y:260, x:70, rotation:20, duration:1.1, ease:'power2.in'})
      .to(a, {y:220, duration:0.28, ease:'power2.out'})
      .to(a, {y:260, duration:0.18, ease:'power2.in'})
  }

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Newton & the falling <span className="punch">apple</span>.</h1>
          <p className="kicker">A simple observation led to a universal idea: gravity acts everywhere.</p>
        </div>
        <div className="stage" style={{overflow:'visible'}}>
          <img ref={artRef} src={newtonSVG} alt="Newton drawing" className="newton-art" />
          <div ref={appleRef} className="apple-fall" aria-hidden>
            <div className="apple-core" />
            <div className="apple-leaf" />
          </div>
        </div>
        <div className="row">
          <button className="btn" onClick={dropApple}>Drop the apple!</button>
          <span className="label">See how a tiny idea becomes a grand law.</span>
        </div>
      </div>
    </div>
  )
}

function SubscribeSlide(){
  const scope = useEnterAnimation([])
  const badgeRef = useRef(null)
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)

  useEffect(()=>{
    gsap.to(badgeRef.current, {y:-6, repeat:-1, yoyo:true, duration:3, ease:'sine.inOut'})
  },[])

  const submit = (e)=>{
    e && e.preventDefault && e.preventDefault()
    if(!email || !email.includes('@')){
      gsap.fromTo('.subscribe-input', {x:-6},{x:0, duration:0.3, ease:'elastic.out(1,0.6)'})
      return
    }
    const b = badgeRef.current
    const tl = gsap.timeline({onComplete:()=>setOk(true)})
    tl.to(b, {scale:1.06, duration:0.18, ease:'power1.out'})
      .to(b, {scale:1, duration:0.12, ease:'power1.in'})
  }

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Stay curious -- <span className="punch">subscribe</span> for tiny labs.</h1>
          <p className="kicker">Weekly playful physics delivered to your inbox. No spam, just sparks.</p>
        </div>
        <div className="stage" style={{display:'flex', alignItems:'center', gap:24, padding:28}}>
          <img ref={badgeRef} src={subscribeBadge} alt="Subscribe badge" className="subscribe-badge" />
          <form className="subscribe-form" onSubmit={submit}>
            {ok ? (
              <div className="subscribe-success">Thanks -- you're on the list! *</div>
            ) : (
              <>
                <input className="subscribe-input" placeholder="you@school.edu" value={email} onChange={e=>setEmail(e.target.value)} />
                <div className="row" style={{marginTop:12}}>
                  <button className="btn" type="button" onClick={submit}>Subscribe</button>
                  <span className="label">We'll send a friendly experiment.</span>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="row"><span className="label">Tip: use a school or personal email to get classroom-safe labs.</span></div>
      </div>
    </div>
  )
}

function ExperimentLabSlide(){
  const scope = useEnterAnimation([])
  const [concentration, setConcentration] = useState(30)
  const bubblesRef = useRef(null)

  useEffect(()=>{
    const node = bubblesRef.current
    if(!node) return
    // regenerate simple bubble elements
    node.innerHTML = ''
    const count = Math.max(8, Math.floor(concentration/4))
    for(let i=0;i<count;i++){
      const b = document.createElement('div')
      b.className = 'lab-bubble'
      const size = 8 + Math.random()* (concentration/4)
      b.style.width = `${size}px`
      b.style.height = `${size}px`
      b.style.left = `${10 + Math.random()*80}%`
      b.style.top = `${20 + Math.random()*60}%`
      b.style.opacity = `${0.5 + Math.random()*0.6}`
      node.appendChild(b)
      gsap.to(b, {y:-20 - Math.random()*40, duration:2 + Math.random()*2, yoyo:true, repeat:-1, ease:'sine.inOut', delay:Math.random()*1.2})
    }
  }, [concentration])

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Experiment Lab: mix and watch bubbly <span className="punch">results</span>.</h1>
          <p className="kicker">Slide the concentration and observe bubble size & activity.</p>
        </div>
        <div className="stage lab-stage">
          <div className="beaker">
            <div className="liquid" style={{height:`${concentration}%`}} />
            <div ref={bubblesRef} className="bubbles" aria-hidden />
          </div>
          <div className="lab-gif" aria-hidden>
            {/* small playful animated stripe as GIF alternative */}
            <svg width="100" height="100" viewBox="0 0 100 100">
              <rect x="6" y="6" width="88" height="88" rx="12" fill="none" stroke="rgba(255,255,255,0.06)" />
              <circle cx="50" cy="50" r="24" fill="url(#g)" />
              <defs>
                <radialGradient id="g"><stop offset="0%" stopColor="#fff" stopOpacity="0.85"/><stop offset="100%" stopColor="#7afdf7" stopOpacity="0.2"/></radialGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="row">
          <label className="label">Concentration: {concentration}%</label>
          <input className="input" type="range" min="10" max="90" value={concentration} onChange={e=>setConcentration(parseInt(e.target.value))} />
          <span className="label">Higher - more bubbles, bigger fizz.</span>
        </div>
      </div>
    </div>
  )
}

function QuizSlide(){
  const scope = useEnterAnimation([])
  const [selected, setSelected] = useState(null)
  const correct = 1
  const [celebrate, setCelebrate] = useState(false)

  useEffect(()=>{
    if(selected===null) return
    if(selected===correct){
      setCelebrate(true)
      setTimeout(()=>setCelebrate(false), 1200)
    }
  }, [selected])

  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">Quick check: which is a <span className="punch">model</span> in physics?</h1>
          <p className="kicker">A model is a simplified description we can compute with.</p>
        </div>
        <div className="quiz">
          {[
            "A set of equations predicting a ball's path",
            'Your favorite lab coat',
            'A microscope'
          ].map((q,i)=>{
            const state = selected===null? '' : (i===correct? 'correct' : (i===selected? 'wrong':''))
            return (
              <div key={i} className={`choice ${state}`} onClick={()=>setSelected(i)}>
                <div> {String.fromCharCode(65+i)}. {q}</div>
              </div>
            )
          })}
        </div>
        {celebrate && <svg className="confetti">
          {[...Array(50)].map((_,i)=>{
            const x = Math.random()*100; const y = -5 - Math.random()*10
            const dur = 0.8+Math.random()*0.7
            const size = 4+Math.random()*6
            return <rect key={i} x={`${x}%`} y={`${y}%`} width={size} height={size} fill={['#38bdf8','#f472b6','#fde047','#22c55e','#c084fc'][i%5]} style={{animation:`fall ${dur}s linear forwards`}}/>
          })}
          <style>{`@keyframes fall{to{transform:translateY(120%)} }`}</style>
        </svg>}
        <div className="row">
          <span className="label">Tap an answer. We'll cheer if you nail it.</span>
        </div>
      </div>
    </div>
  )
}

function OutroSlide(){
  const scope = useEnterAnimation([])
  return (
    <div ref={scope} className="slide-card">
      <div className="slide-inner">
        <div>
          <h1 className="h1">You just did physics. <span className="punch">Every</span> swipe.</h1>
          <p className="deck">Curiosity is the engine. Math is the map. Experiments are the compass.</p>
        </div>
        <div className="row">
          <a className="btn" href="https://developer.mozilla.org/en-US/docs/Learn/Physics" target="_blank">Explore more</a>
          <a className="btn" href="https://physics.stackexchange.com/" target="_blank">Ask weird questions</a>
        </div>
        <div className="row"><span className="label">Press R to replay slide entrance animations.</span></div>
      </div>
    </div>
  )
}

export default function App(){
  const swiperRef = useRef(null)
  // inject comic-dot overlays into each slide-card for a halftone comic effect
  useEffect(()=>{
    const ensureDots = (root=document)=>{
      const slides = root.querySelectorAll('.slide-card')
      slides.forEach(s => {
        if(!s.querySelector(':scope > .comic-dots')){
          const d = document.createElement('div')
          d.className = 'comic-dots'
          d.setAttribute('aria-hidden','true')
          s.insertBefore(d, s.firstChild)
        }
      })
    }

    ensureDots()
    // observe additions (Swiper may create slides dynamically)
    const mo = new MutationObserver((list)=>{
      for(const m of list){
        if(m.type === 'childList' && m.addedNodes.length){
          ensureDots(m.target)
        }
      }
    })
    mo.observe(document.querySelector('.content-shell') || document.body, {childList:true, subtree:true})
    return ()=>mo.disconnect()
  },[])
  useEffect(()=>{
    const handler = (e)=>{
      if(e.key.toLowerCase()==='r'){
        const slide = document.querySelector('.swiper-slide-active .slide-card')
        if(!slide) return
        const ctx = gsap.context(()=>{
          gsap.fromTo(slide.querySelector('.h1'), {y:40, opacity:0},{y:0, opacity:1, duration:0.6, ease:'back.out'})
          gsap.fromTo(slide.querySelectorAll('.kicker, .deck'), {y:20, opacity:0},{y:0, opacity:1, duration:0.5, stagger:0.08}, '<0.1')
        }, slide)
        return () => ctx.revert()
      }
    }
    window.addEventListener('keydown', handler)
    return ()=>window.removeEventListener('keydown', handler)
  },[])

  return (
    <div className="app">
      <div className="mandala-bg" aria-hidden="true">
        {mandalaLayers.map((layer, index) => (
          <div
            key={`mandala-${index}`}
            className="mandala"
            style={layer.style}
          />
        ))}
        {mandalaOrbs.map((layer, index) => (
          <div
            key={`orb-${index}`}
            className="mandala orb"
            style={layer.style}
          />
        ))}
      </div>
      <div className="content-shell">
        <div className="header">
          <div className="logo">CP</div>
          <div className="brand"><b>Cartoon Physics</b> - Swipe to learn</div>
        </div>
        <Swiper
          modules={[Pagination, Navigation, Keyboard, EffectCreative]}
          pagination={{ clickable:true, type:'bullets' }}
          navigation
          keyboard={{enabled:true}}
          effect="creative"
          creativeEffect={{
            prev: { shadow: true, translate: ['-20%', 0, -1] },
            next: { translate: ['100%', 0, 0] },
          }}
          onSwiper={(s)=>{swiperRef.current = s}}
          className="mySwiper"
        >
          <SwiperSlide><TitleSlide/></SwiperSlide>
          <SwiperSlide><DefinitionSlide/></SwiperSlide>
          <SwiperSlide>
            <NewtonSlide />
          </SwiperSlide>
          <SwiperSlide><GravitySlide/></SwiperSlide>
          <SwiperSlide><MotionSlide/></SwiperSlide>
          <SwiperSlide><ForceSlide/></SwiperSlide>
          <SwiperSlide><EnergySlide/></SwiperSlide>
          <SwiperSlide><PendulumSlide/></SwiperSlide>
          <SwiperSlide><MagnetSlide/></SwiperSlide>
          <SwiperSlide><LightMixSlide/></SwiperSlide>
          <SwiperSlide><WaveSlide/></SwiperSlide>
          <SwiperSlide><ExperimentLabSlide/></SwiperSlide>
          <SwiperSlide>
            <SubscribeSlide />
          </SwiperSlide>
          <SwiperSlide><QuizSlide/></SwiperSlide>
          <SwiperSlide><PromoSlide/></SwiperSlide>
          <SwiperSlide><OutroSlide/></SwiperSlide>
        </Swiper>
        <div className="footer">Made with Swiper + GSAP - Cartoon vibes, serious science</div>
      </div>
    </div>
  )
}

function PromoSlide(){
  const scope = useEnterAnimation([])
  return (
    <div ref={scope} className="slide-card promo-slide">
      <div className="slide-inner">
        <div>
          <h1 className="h1">ASHKAM INTELLIGENT STUDIOS</h1>
          <p className="kicker">Creative tools & playful learning -- built with care.</p>
        </div>
        <div className="stage promo-stage">
          <div className="promo-graphic">TARGET</div>
          <a className="whatsapp-link" href="https://wa.me/918002416363" target="_blank" rel="noreferrer">Chat on WhatsApp +91 88396 94312</a>
        </div>
        <div className="row"><span className="label">Contact for collaborations and custom builds.</span></div>
      </div>
    </div>
  )
}