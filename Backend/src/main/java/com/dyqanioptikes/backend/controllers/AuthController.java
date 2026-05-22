@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // Konstruktori
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Logjika...
        return ResponseEntity.ok("User logged in");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        authService.registerUser(signUpRequest);
        return ResponseEntity.ok("User registered successfully");
    }
}