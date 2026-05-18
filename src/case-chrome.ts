import Lenis from 'lenis'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initSmoothScroll() {
  if (reducedMotion) return

  const lenis = new Lenis({
    lerp: 0.075,
    duration: 1.35,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1,
    syncTouch: true,
    syncTouchLerp: 0.08,
    autoRaf: true,
  })

  document.documentElement.classList.add('lenis')
  document.body.classList.add('lenis')

  window.addEventListener('beforeunload', () => {
    lenis.destroy()
  })
}

function springStep(current: number, target: number, velocity: number, dt: number) {
  const stiffness = 500
  const damping = 32
  const mass = 0.5
  const spring = -stiffness * (current - target)
  const damper = -damping * velocity
  const accel = (spring + damper) / mass
  const nextVelocity = velocity + accel * dt
  const next = current + nextVelocity * dt
  return [next, nextVelocity] as const
}

function initCursor() {
  if (reducedMotion) return

  document.body.classList.add('case-chrome-cursor')

  const root = document.createElement('div')
  root.className = 'case-cursor'
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">' +
    '<line x1="12" y1="0" x2="12" y2="9" stroke="#fff" stroke-width="1"/>' +
    '<line x1="12" y1="15" x2="12" y2="24" stroke="#fff" stroke-width="1"/>' +
    '<line x1="0" y1="12" x2="9" y2="12" stroke="#fff" stroke-width="1"/>' +
    '<line x1="15" y1="12" x2="24" y2="12" stroke="#fff" stroke-width="1"/>' +
    '<circle cx="12" cy="12" r="2" stroke="#fff" stroke-width="1" fill="none"/>' +
    '</svg>'
  document.body.appendChild(root)

  let x = -100
  let y = -100
  let vx = 0
  let vy = 0
  let tx = -100
  let ty = -100
  let last = performance.now()

  const onMove = (e: MouseEvent) => {
    tx = e.clientX
    ty = e.clientY
  }

  window.addEventListener('mousemove', onMove)

  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.064)
    last = now
    ;[x, vx] = springStep(x, tx, vx, dt)
    ;[y, vy] = springStep(y, ty, vy, dt)
    root.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

function initEnterButtons() {
  const buttons = document.querySelectorAll<HTMLAnchorElement>('.enter-btn')

  buttons.forEach((btn) => {
    const on = () => {
      btn.setAttribute('data-hovered', '')
      document.body.classList.add('enter-btn-hover')
    }
    const off = () => {
      btn.removeAttribute('data-hovered')
      document.body.classList.remove('enter-btn-hover')
    }

    btn.addEventListener('mouseenter', on)
    btn.addEventListener('mouseleave', off)
    btn.addEventListener('focus', on)
    btn.addEventListener('blur', off)
  })
}

initSmoothScroll()
initCursor()
initEnterButtons()
