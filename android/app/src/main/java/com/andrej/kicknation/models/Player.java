package com.andrej.kicknation.models;

public class Player {
    private String id;
    private String playerName;  // ali playerName
    private String rating;
    private String country;
    private String position;

    // Konstruktor
    public Player(String name, String position, String rating, String country, String id) {
        this.id = id;
        this.playerName = name;
        this.rating = rating;
        this.country = country;
        this.position = position;
    }

    @Override
    public String toString() {
        return "Player{" +
                "name='" + playerName + '\'' +
                ", position='" + position + '\'' +
                ", rating='" + rating + '\'' +
                ", country='" + country + '\'' +
                ", id='" + id + '\'' +
                '}';
    }

    // Getterji
    public String getId() {
        return id;
    }

    public String getName() {
        return playerName;
    }

    public String getRating() {
        return rating;
    }

    public String getCountry() {
        return country;
    }

    public String getPosition() {
        return position;
    }

    // Setterji (po potrebi)
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.playerName = name;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
