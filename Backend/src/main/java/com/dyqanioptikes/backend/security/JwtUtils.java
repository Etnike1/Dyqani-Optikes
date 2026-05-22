@Component
public class JwtUtils {
    private final String jwtSecret = "sekretiytshumeeformatqenukduhettedijekush"; // Ndryshoje!

    public String generateJwtToken(Authentication authentication) {
        // Logjika për gjenerimin e tokenit (përdor Jwts.builder())
        // ...
        return "JWT_TOKEN_HERE";
    }
}