package com.dyqanioptikes.backend.config;

import com.dyqanioptikes.backend.models.Klientet;
import com.dyqanioptikes.backend.models.Role;
import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.models.UserClaim;
import com.dyqanioptikes.backend.models.UserRole;
import com.dyqanioptikes.backend.repositories.KlientetRepository;
import com.dyqanioptikes.backend.repositories.RoleRepository;
import com.dyqanioptikes.backend.repositories.UserClaimRepository;
import com.dyqanioptikes.backend.repositories.UserRepository;
import com.dyqanioptikes.backend.repositories.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserClaimRepository userClaimRepository;
    private final KlientetRepository klientetRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.profiles.active:}")
    private String activeProfile;

    public DataInitializer(
            UserRepository userRepository,
            RoleRepository roleRepository,
            UserRoleRepository userRoleRepository,
            UserClaimRepository userClaimRepository,
            KlientetRepository klientetRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.userClaimRepository = userClaimRepository;
        this.klientetRepository = klientetRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (activeProfile.contains("prod")) {
            log.info("Skipping default account initialization in production profile");
            return;
        }

        log.info("Running identity data initializer");

        Role adminRole = ensureRoleExists("ROLE_ADMIN");
        Role employeeRole = ensureRoleExists("ROLE_EMPLOYEE");
        Role clientRole = ensureRoleExists("ROLE_CLIENT");

        ensureUserWithRole("admin", "admin@dyqanioptikes.local", "Admin123!", adminRole, null, null);
        ensureUserWithRole("employee", "employee@dyqanioptikes.local", "Employee123!", employeeRole, null, null);
        ensureClientAccount("client", "client@dyqanioptikes.local", "Client123!", clientRole, "Client", "User");
    }

    private Role ensureRoleExists(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    log.info("Creating missing role {}", roleName);
                    Role role = new Role();
                    role.setName(roleName);
                    return roleRepository.save(role);
                });
    }

    private void ensureUserWithRole(String username, String email, String password, Role role, String firstName, String lastName) {
        Optional<User> existing = userRepository.findByUsername(username);
        if (existing.isPresent()) {
            User user = existing.get();
            boolean alreadyHasRole = userRoleRepository.findByUserId(user.getId()).stream()
                    .anyMatch(userRole -> userRole.getRole().getId().equals(role.getId()));
            if (!alreadyHasRole) {
                log.info("Assigning missing role {} to existing user {}", role.getName(), username);
                userRoleRepository.save(new UserRole(user, role));
            }
            return;
        }

        log.info("Seeding user {} with role {}", username, role.getName());
        User user = new User(username, email, passwordEncoder.encode(password));
        userRepository.save(user);
        userRoleRepository.save(new UserRole(user, role));

        if (role.getName().equals("ROLE_CLIENT")) {
            createClientRecord(user, firstName, lastName);
        }
    }

    private void ensureClientAccount(String username, String email, String password, Role clientRole, String firstName, String lastName) {
        Optional<User> existing = userRepository.findByUsername(username);
        if (existing.isPresent()) {
            User user = existing.get();
            boolean alreadyHasRole = userRoleRepository.findByUserId(user.getId()).stream()
                    .anyMatch(userRole -> userRole.getRole().getId().equals(clientRole.getId()));
            if (!alreadyHasRole) {
                log.info("Assigning missing client role to existing user {}", username);
                userRoleRepository.save(new UserRole(user, clientRole));
            }
            return;
        }

        ensureUserWithRole(username, email, password, clientRole, firstName, lastName);
    }

    private void createClientRecord(User user, String firstName, String lastName) {
        if (klientetRepository.findByUserId(user.getId()).isPresent()) {
            return;
        }

        log.info("Creating client profile for user {}", user.getUsername());
        Klientet klient = new Klientet();
        klient.setEmri(firstName != null ? firstName : user.getUsername());
        klient.setMbiemri(lastName != null ? lastName : user.getUsername());
        klient.setEmail(user.getEmail());
        klient.setUserId(user.getId());
        klientetRepository.save(klient);

        userClaimRepository.save(new UserClaim(user, "klient_id", String.valueOf(klient.getId())));
    }
}
