import { r as a, j as l } from "./index-BWmU0So1.js"
function F() {
  const b = a.useRef(null),
    [O, d] = a.useState(0),
    [w, m] = a.useState(!1),
    [T, h] = a.useState(!1),
    [u, C] = a.useState(!1),
    t = a.useRef({
      dinoY: 0,
      velocityY: 0,
      obstacles: [],
      frameCount: 0,
      animationId: 0,
      gameOver: !1,
      isRunning: !1,
    })
  a.useEffect(() => {
    const n = () => {
      const e = "ontouchstart" in window || navigator.maxTouchPoints > 0
      C(e)
    }
    return (
      n(),
      window.addEventListener("resize", n),
      () => window.removeEventListener("resize", n)
    )
  }, [])
  const f = () => {
      t.current.dinoY === 0 &&
        !t.current.gameOver &&
        (t.current.velocityY = -12)
    },
    k = () => {
      const n = b.current,
        e = n == null ? void 0 : n.getContext("2d")
      if (!e || !n) return
      t.current.animationId && cancelAnimationFrame(t.current.animationId),
        (t.current = {
          dinoY: 0,
          velocityY: 0,
          obstacles: [],
          frameCount: 0,
          animationId: 0,
          gameOver: !1,
          isRunning: !0,
        }),
        d(0),
        m(!1),
        h(!0)
      const R = 0.7,
        i = 100,
        g = () => {
          if (t.current.gameOver) return
          t.current.frameCount++,
            e.clearRect(0, 0, n.width, n.height),
            (e.fillStyle = "black"),
            e.fillRect(0, i, n.width, 2),
            (t.current.velocityY += R),
            (t.current.dinoY -= t.current.velocityY),
            t.current.dinoY < 0 &&
              ((t.current.dinoY = 0), (t.current.velocityY = 0)),
            t.current.frameCount % 90 === 0 &&
              t.current.obstacles.push({
                x: n.width,
                width: 15,
                height: 20 + Math.random() * 20,
              }),
            (e.fillStyle = "black"),
            t.current.obstacles.forEach((r) => {
              ;(r.x -= 5), e.fillRect(r.x, i - r.height, r.width, r.height)
            }),
            (t.current.obstacles = t.current.obstacles.filter(
              (r) => r.x + r.width > 0,
            )),
            (e.fillStyle = "black"),
            e.fillRect(30, i - 20 - t.current.dinoY, 20, 20)
          const s = 30,
            v = 50,
            p = i - 20 - t.current.dinoY,
            x = i - t.current.dinoY
          for (const r of t.current.obstacles) {
            const c = r.x,
              y = r.x + r.width,
              E = i - r.height,
              S = i,
              o = v > c && s < y,
              Y = x > E && p < S
            if (o && Y) {
              m(!0),
                h(!1),
                (t.current.gameOver = !0),
                (t.current.isRunning = !1),
                (e.fillStyle = "red"),
                (e.font = "16px monospace"),
                e.fillText("GAME OVER", n.width / 2 - 40, 60),
                (e.font = "12px monospace"),
                e.fillText("Tap to restart", n.width / 2 - 60, 80),
                cancelAnimationFrame(t.current.animationId)
              return
            }
          }
          t.current.frameCount % 10 === 0 && d((r) => r + 1),
            (t.current.animationId = requestAnimationFrame(g))
        }
      g()
    }
  return (
    a.useEffect(() => {
      const n = b.current
      if (!n) return
      const e = n.getContext("2d")
      if (!e) return
      const R = 0.7,
        i = 100,
        g = () => {
          e.clearRect(0, 0, n.width, n.height),
            (e.fillStyle = "black"),
            e.fillRect(0, i, n.width, 2),
            (e.fillStyle = "black"),
            e.fillRect(30, i - 20, 20, 20),
            (e.fillStyle = "black"),
            (e.font = "16px monospace"),
            e.fillText("Tap or Press SPACE to start", n.width / 2 - 100, 60),
            u &&
              ((e.font = "12px monospace"),
              e.fillText("Tap screen to jump", n.width / 2 - 60, 80))
        },
        s = () => {
          t.current.animationId && cancelAnimationFrame(t.current.animationId),
            (t.current = {
              dinoY: 0,
              velocityY: 0,
              obstacles: [],
              frameCount: 0,
              animationId: 0,
              gameOver: !1,
              isRunning: !0,
            }),
            d(0),
            m(!1),
            h(!0),
            v()
        },
        v = () => {
          if (t.current.gameOver) return
          t.current.frameCount++,
            e.clearRect(0, 0, n.width, n.height),
            (e.fillStyle = "black"),
            e.fillRect(0, i, n.width, 2),
            (t.current.velocityY += R),
            (t.current.dinoY -= t.current.velocityY),
            t.current.dinoY < 0 &&
              ((t.current.dinoY = 0), (t.current.velocityY = 0)),
            t.current.frameCount % 90 === 0 &&
              t.current.obstacles.push({
                x: n.width,
                width: 15,
                height: 20 + Math.random() * 20,
              }),
            (e.fillStyle = "black"),
            t.current.obstacles.forEach((o) => {
              ;(o.x -= 5), e.fillRect(o.x, i - o.height, o.width, o.height)
            }),
            (t.current.obstacles = t.current.obstacles.filter(
              (o) => o.x + o.width > 0,
            )),
            (e.fillStyle = "black"),
            e.fillRect(30, i - 20 - t.current.dinoY, 20, 20)
          const c = 30,
            y = 50,
            E = i - 20 - t.current.dinoY,
            S = i - t.current.dinoY
          for (const o of t.current.obstacles) {
            const Y = o.x,
              A = o.x + o.width,
              I = i - o.height,
              L = i,
              j = y > Y && c < A,
              M = S > I && E < L
            if (j && M) {
              m(!0),
                h(!1),
                (t.current.gameOver = !0),
                (t.current.isRunning = !1),
                (e.fillStyle = "red"),
                (e.font = "16px monospace"),
                e.fillText("GAME OVER", n.width / 2 - 40, 60),
                (e.font = "12px monospace"),
                e.fillText(
                  u ? "Tap to restart" : "Press Enter to restart",
                  n.width / 2 - 60,
                  80,
                ),
                cancelAnimationFrame(t.current.animationId)
              return
            }
          }
          t.current.frameCount % 10 === 0 && d((o) => o + 1),
            (t.current.animationId = requestAnimationFrame(v))
        },
        p = (c) => {
          c.code === "Space" || c.code === "ArrowUp"
            ? (c.preventDefault(),
              !t.current.isRunning && !t.current.gameOver
                ? s()
                : t.current.gameOver || f())
            : c.code === "Enter" && t.current.gameOver && s()
        },
        x = (c) => {
          c.cancelable && c.preventDefault(),
            (!t.current.isRunning && !t.current.gameOver) || t.current.gameOver
              ? s()
              : t.current.gameOver || f()
        },
        r = (c) => {
          if (!t.current.isRunning && !t.current.gameOver) s()
          else {
            if (t.current.gameOver) return
            t.current.gameOver || f()
          }
        }
      return (
        g(),
        window.addEventListener("keydown", p),
        n.addEventListener("touchstart", x, { passive: !1 }),
        n.addEventListener("click", r),
        () => {
          window.removeEventListener("keydown", p),
            n.removeEventListener("touchstart", x),
            n.removeEventListener("click", r),
            t.current.animationId && cancelAnimationFrame(t.current.animationId)
        }
      )
    }, [u]),
    l.jsxs("div", {
      className:
        "flex h-full w-full flex-col items-center justify-center bg-white p-4 text-black",
      children: [
        l.jsx("canvas", {
          ref: b,
          width: 400,
          height: 120,
          className: "w-full max-w-md border-2 border-black bg-white",
          style: { touchAction: "none", display: "block", margin: "0 auto" },
        }),
        l.jsx("div", {
          className: "mt-2 text-center font-mono text-sm",
          children: w
            ? u
              ? "GAME OVER – Tap to restart"
              : "GAME OVER – Press Enter to restart"
            : T
              ? `Score: ${O}`
              : u
                ? "Tap to start"
                : "Press SPACE to start",
        }),
        u &&
          l.jsxs(l.Fragment, {
            children: [
              T &&
                !w &&
                l.jsx("button", {
                  onClick: f,
                  onTouchStart: (n) => {
                    n.stopPropagation(), f()
                  },
                  className:
                    "mt-4 rounded-lg bg-black px-6 py-3 font-mono text-white active:bg-gray-800",
                  style: {
                    userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                    fontSize: "16px",
                  },
                  children: "JUMP",
                }),
              w &&
                l.jsx("button", {
                  onClick: k,
                  onTouchStart: (n) => {
                    n.stopPropagation(), k()
                  },
                  className:
                    "mt-4 rounded-lg bg-red-500 px-6 py-3 font-mono text-white active:bg-red-600",
                  style: {
                    userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                    fontSize: "16px",
                  },
                  children: "RESTART",
                }),
            ],
          }),
      ],
    })
  )
}
export { F as default }
