package com.dyqanioptikes.backend.services;


import com.dyqanioptikes.backend.models.User;
import com.dyqanioptikes.backend.models.Role;
import com.dyqanioptikes.backend.models.UserRole;
import com.dyqanioptikes.backend.dto.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.dyqanioptikes.backend.repositories.UserRepository;
import com.dyqanioptikes.backend.repositories.RoleRepository;
import com.dyqanioptikes.backend.repositories.UserRoleRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       UserRoleRepository userRoleRepository,
                       PasswordEncoder encoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.encoder = encoder;
    }

    public void registerUser(RegisterRequest signUpRequest) {

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        userRepository.save(user);

        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() ->
                        new RuntimeException("Role not found"));

        UserRole userRole = new UserRole(user, role);

        userRoleRepository.save(userRole);
    }
}