function select(event: any) {
  event.target.select();
}

export default defineNuxtPlugin((app) => {
  app.vueApp.directive("select-on-click", {
    mounted(el) {
      el.addEventListener("click", select);
    },
    unmounted(el) {
      el.removeEventListener("click", select);
    },
  });
});
