package com.andrej.kicknation.models;

import java.util.List;

public class Match {
    private String username;
    private List<Integer> score;


    public String getUsername() {
        return username;
    }

    public List<Integer> getScore() {
        return score;
    }


    public int getClubScore() {
        return score != null && score.size() > 1 ? score.get(1) : 0;
    }

    public int getOpponentScore() {
        return score != null && score.size() > 2 ? score.get(2) : 0;
    }
}
