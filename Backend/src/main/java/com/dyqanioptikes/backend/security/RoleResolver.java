package com.dyqanioptikes.backend.security;

import com.dyqanioptikes.backend.models.UserRole;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public final class RoleResolver {

    private static final List<String> PRIORITY = List.of(
            Roles.ADMIN,
            Roles.EMPLOYEE,
            Roles.CLIENT
    );

    private RoleResolver() {
    }

    public static String resolvePrimary(Collection<? extends GrantedAuthority> authorities) {
        Set<String> roleNames = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
        return resolvePrimary(roleNames);
    }

    public static String resolvePrimaryFromUserRoles(Collection<UserRole> userRoles) {
        Set<String> roleNames = userRoles.stream()
                .map(userRole -> userRole.getRole().getName())
                .collect(Collectors.toSet());
        return resolvePrimary(roleNames);
    }

    public static String resolvePrimary(Set<String> roleNames) {
        for (String candidate : PRIORITY) {
            if (roleNames.contains(candidate)) {
                return candidate;
            }
        }
        return roleNames.isEmpty() ? "" : roleNames.iterator().next();
    }
}
