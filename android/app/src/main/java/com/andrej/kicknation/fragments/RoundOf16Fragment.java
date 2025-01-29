package com.andrej.kicknation.fragments;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.andrej.kicknation.R;
import com.andrej.kicknation.api.API;
import com.andrej.kicknation.api.RetrofitClient;
import com.andrej.kicknation.models.Match;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RoundOf16Fragment extends Fragment {

    private static final String ARG_USERNAME = "username";
    private String username;
    private TextView roundOf16TextView;

    public RoundOf16Fragment() {
        // Required empty public constructor
    }

    public static RoundOf16Fragment newInstance(String username) {
        RoundOf16Fragment fragment = new RoundOf16Fragment();
        Bundle args = new Bundle();
        args.putString(ARG_USERNAME, username);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            username = getArguments().getString(ARG_USERNAME);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_round_of16, container, false);
        roundOf16TextView = view.findViewById(R.id.roundOf16TextView);


        fetchStageMatches("RoundOf16");

        return view;
    }

    private void fetchStageMatches(String tournamentStage) {

        API api = RetrofitClient.getInstance().getAPI();
        Call<List<Match>> call = api.getStageMatches(username, tournamentStage);

        call.enqueue(new Callback<List<Match>>() {
            @Override
            public void onResponse(Call<List<Match>> call, Response<List<Match>> response) {
                if (response.isSuccessful()) {
                    List<Match> matches = response.body();
                    if (matches != null && !matches.isEmpty()) {
                        displayMatches(matches);
                    } else {
                        roundOf16TextView.setText("Round Of 16 will be played at 8am.");
                    }
                } else {
                    Toast.makeText(getActivity(), "Error getting data.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Match>> call, Throwable t) {
                Toast.makeText(getActivity(), "Error connecting to server.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayMatches(List<Match> matches) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < matches.size(); i += 2) {
            Match match1 = matches.get(i);
            Match match2 = matches.get(i + 1);


            String club1 = match1.getUsername();
            String club2 = match2.getUsername();
            int score1 = match1.getScore().get(1);
            int score2 = match2.getScore().get(1);


            sb.append(club1).append(" - ").append(club2)
                    .append(" : ").append(score1).append("-").append(score2).append("\n");
        }



        roundOf16TextView.setText(sb.toString());
    }




}
