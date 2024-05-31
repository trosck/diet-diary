import type { Pinia, PiniaPluginContext } from "pinia";

function PiniaLogger({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}`, mutation.events);
  });

  return { creationTime: new Date() };
}

export default defineNuxtPlugin(({ $pinia }) => {
  ($pinia as Pinia).use(PiniaLogger);
});
