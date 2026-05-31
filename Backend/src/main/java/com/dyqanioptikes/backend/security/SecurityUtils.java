package com.dyqanioptikes.backend.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static CustomUserDetails getCurrentUser() {
        Authentication auth = getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails user)) {
            throw new AccessDeniedException("Not authenticated");
        }
        return user;
    }

    public static Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public static String getCurrentUsername() {
        return getCurrentUser().getUsername();
    }

    public static String getCurrentRole() {
        return getCurrentUser().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("");
    }

    public static boolean hasRole(String role) {
        String normalized = role.startsWith("ROLE_") ? role : "ROLE_" + role;
        return getCurrentUser().getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(normalized));
    }

    public static boolean isAdmin() {
        return hasRole("ROLE_ADMIN");
    }

    public static boolean isEmployee() {
        return hasRole("ROLE_EMPLOYEE");
    }

    public static boolean isClient() {
        return hasRole("ROLE_CLIENT");
    }

    public static boolean isStaff() {
        return isAdmin() || isEmployee();
    }
}
