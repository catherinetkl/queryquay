package com.catherinetkl.spring.security.postgresql.models;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public Role() {

    }
    public Role(ERole name) {
        this.name = name;
    }
    public Integer getId() {
        return id;
    }
    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
