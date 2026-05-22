package com.dyqanioptikes.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_claims")
public class UserClaim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String claimType;

    @Column(nullable = false)
    private String claimValue;

    public UserClaim() {
    }

    public UserClaim(User user, String claimType, String claimValue) {
        this.user = user;
        this.claimType = claimType;
        this.claimValue = claimValue;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getClaimType() { return claimType; }
    public void setClaimType(String claimType) { this.claimType = claimType; }

    public String getClaimValue() { return claimValue; }
    public void setClaimValue(String claimValue) { this.claimValue = claimValue; }
}