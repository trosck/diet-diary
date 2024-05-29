export default defineNuxtPlugin((app) => {
  app.vueApp.directive("select-on-click", {
    mounted(el) {
      el.addEventListener("click", (event: any) => {
        event.target.select();
      });
    },
  });
});
