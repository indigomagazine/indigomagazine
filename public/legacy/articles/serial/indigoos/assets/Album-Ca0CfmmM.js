import { r as c, j as e } from "./index-BWmU0So1.js";
const u = [
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339839/blurredo_b2hteu.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339839/facestretch_sadc29.png",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339839/facetrack2.1_kjoknh.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339838/typewrite_gpnblb.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339838/blurexposure-2_fsv4yg.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339837/serialword_lwqswl.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339837/barcodetie_l5tnpx.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339837/WIP_dcbx8e.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339837/nobarcode_sfcpzr.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339836/glitch_gm3bqa.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339836/text2_afabso.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339835/keyboard_tojvm4.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1765339835/greenscreenedit_i5wwxl.jpg",
  "https://res.cloudinary.com/dyj46skdc/image/upload/v1766192156/1_zgviq7.png",
];
function h() {
  const [l, m] = c.useState(u),
    [t, s] = c.useState(null),
    i = () => {
      t !== null && t > 0 ? s(t - 1) : t !== null && t === 0 && s(l.length - 1);
    },
    n = () => {
      t !== null && t < l.length - 1
        ? s(t + 1)
        : t !== null && t === l.length - 1 && s(0);
    },
    d = (o) => {
      s(o);
    },
    r = () => {
      s(null);
    };
  return e.jsxs("div", {
    className: "relative flex h-full flex-col overflow-hidden bg-gray-50",
    children: [
      e.jsxs("div", {
        className:
          "shrink-0 border-b border-gray-200 bg-gray-50 px-4 pb-2 pt-4 text-center",
        children: [
          e.jsx("h1", {
            className: "text-xl font-bold tracking-tight text-gray-900",
            children: "Photo Collection",
          }),
          e.jsxs("p", {
            className: "mt-1 text-sm text-gray-500",
            children: [l.length, " photos loaded from library"],
          }),
        ],
      }),
      e.jsx("div", {
        className: "flex-1 overflow-y-auto px-4 py-4",
        children: e.jsx("div", {
          className:
            "mx-auto columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4",
          children: l.map((o, a) =>
            e.jsxs(
              "div",
              {
                className:
                  "group relative mb-3 break-inside-avoid overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl",
                onClick: () => d(a),
                children: [
                  e.jsx("img", {
                    crossOrigin: "anonymous",
                    src: o,
                    alt: `Gallery item ${a + 1}`,
                    className:
                      "h-auto w-full transform cursor-zoom-in bg-gray-200 transition-transform duration-300 group-hover:scale-[1.02]",
                    loading: "lazy",
                  }),
                  e.jsx("div", {
                    className:
                      "absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-10",
                  }),
                ],
              },
              a
            )
          ),
        }),
      }),
      t !== null &&
        e.jsx("div", {
          className:
            "absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-95 backdrop-blur-sm",
          onClick: r,
          children: e.jsxs("div", {
            className:
              "relative flex h-full w-full items-center justify-center p-4",
            onClick: (o) => o.stopPropagation(),
            children: [
              e.jsx("button", {
                className:
                  "absolute left-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30",
                onClick: (o) => {
                  o.stopPropagation(), i();
                },
                children: "←",
              }),
              e.jsx("img", {
                crossOrigin: "anonymous",
                src: l[t],
                alt: `Full screen view ${t + 1}`,
                className:
                  "max-h-full max-w-full cursor-pointer object-contain",
                onClick: r,
              }),
              e.jsx("button", {
                className:
                  "absolute right-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30",
                onClick: (o) => {
                  o.stopPropagation(), n();
                },
                children: "→",
              }),
              e.jsx("div", {
                className: "absolute bottom-4 left-0 right-0 text-center",
                children: e.jsxs("p", {
                  className: "text-sm text-white/80",
                  children: [t + 1, " of ", l.length],
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
export { h as default };
