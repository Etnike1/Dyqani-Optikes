package com.dyqanioptikes.backend;

import org.flywaydb.core.Flyway;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public Flyway flyway() {
        Flyway flyway = Flyway.configure()
                .dataSource("jdbc:sqlserver://localhost:1433;databaseName=DyqaniOptikesDB;encrypt=true;trustServerCertificate=true",
                        "sa", "sdiqapobahet72") // Sigurohu qe fjalekalimi eshte i saktë
                .baselineOnMigrate(true)
                .load();
        return flyway;
    }

    @Bean
    public CommandLineRunner runFlyway(Flyway flyway) {
        return args -> {
            System.out.println("------------------------------------");
            System.out.println("Duke nisur migrimin manual të Flyway...");
            flyway.migrate();
            System.out.println("Migrimi përfundoi me sukses!");
            System.out.println("------------------------------------");
        };
    }
}