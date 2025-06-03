import { authApi } from "@/api/auth";
import { useAuthStore } from "../stores/auth";
import type { RouteLocationNormalizedGeneric } from "vue-router";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (to.path !== "/login") {
    if (to.path.startsWith("/customer")) {
      checkAuth();
    } else {
      checkAuth();
    }
  }
  const check = checkPermission(to);
  if(check == "disallow"){
    return navigateTo("/dashboard");
  }
  if (!authStore.isLoggedIn && to.path !== "/login") {
    authStore.logout();
    return navigateTo("/login");
  }
});

async function checkAuth() {
  const authStore = useAuthStore();
  authApi()
    .verifyAuth()
    .then((response) => {
      if (response.success == false) {
        authStore.logout();
      }
      authStore.user = response.data;
    })
    .catch((error) => {
      console.error("authStore cek auth error", error);
    });
}

function checkPermission(to: RouteLocationNormalizedGeneric) {
  const authStore = useAuthStore();

  const restrictedForAdmins = [""];
  const restrictedForTechnicians = [""];
  const restrictedForFinances = ["/dashboard/companies","/dashboard/asset","/dashboard/area","/dashboard/internet-package"];
  if (
    authStore.user.role === "ADMIN" &&
    restrictedForAdmins.includes(to.path)
  ) {
    return "disallow"
  }
  if (
    authStore.user.role === "TECHNICIAN" &&
    restrictedForTechnicians.includes(to.path)
  ) {
    return "disallow"
  }
  if (
    authStore.user.role === "FINANCE" &&
    restrictedForFinances.includes(to.path)
  ) {
    return "disallow"
  }
}
