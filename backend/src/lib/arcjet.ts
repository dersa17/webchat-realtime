import { ENV } from "./env.js";

// export dalam bentuk Promise, karena kita pakai dynamic import
export const aj = (async () => {
  const arcjetModule = await import("@arcjet/node");
  const arcjet = arcjetModule.default;
  const { shield, detectBot, slidingWindow } = arcjetModule;

  return arcjet({
    key: ENV.ARCJET_KEY as string,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
      slidingWindow({
        mode: "LIVE",
        max: 100,
        interval: 60,
      }),
    ],
  });
})();
