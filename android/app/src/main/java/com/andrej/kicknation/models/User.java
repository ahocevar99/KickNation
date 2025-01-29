package com.andrej.kicknation.models;

public class User {

    private int id;
    private String username, password, clubName;

    public User(String username, String password, String clubName) {
        this.username = username;
        this.password = password;
        this.clubName = clubName;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getClubName() {
        return clubName;
    }
}
