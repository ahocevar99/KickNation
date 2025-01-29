package com.andrej.kicknation;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.andrej.kicknation.api.RetrofitClient;
import com.andrej.kicknation.models.MyTeamResponse;
import com.andrej.kicknation.models.Player;
import com.andrej.kicknation.PlayerAdapter;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Home extends AppCompatActivity {

    private RecyclerView playersRecyclerView;
    private TextView clubNameTextView;
    private TextView moneyTextView;
    private TextView joinDateTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        String username = getIntent().getStringExtra("USERNAME");

        if (username == null || username.isEmpty()) {
            Toast.makeText(this, "Username is missing", Toast.LENGTH_SHORT).show();
            return;
        }


        clubNameTextView = findViewById(R.id.clubNameTextView);
        moneyTextView = findViewById(R.id.moneyTextView);
        playersRecyclerView = findViewById(R.id.playersRecyclerView);
        playersRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        joinDateTextView=findViewById(R.id.joinDateTextView);

        Toast.makeText(this, "Welcome " + username, Toast.LENGTH_SHORT).show();

        // Setup BottomNavigationView
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.nav_home);
        bottomNavigationView.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.nav_home:
                        return true;
                    case R.id.nav_play:
                        Intent playIntent = new Intent(Home.this, Play.class);
                        playIntent.putExtra("USERNAME", username);
                        startActivity(playIntent);
                        return true;
                    case R.id.nav_buy:
                        Intent buyIntent = new Intent(Home.this, Buy.class);
                        buyIntent.putExtra("USERNAME", username);
                        startActivity(buyIntent);
                        return true;
                }
                return false;
            }
        });


        getMyTeam(username);
        getClubName(username);
        getMoney(username);
        getJoinDate(username);
    }

    private void getClubName(String username) {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().getClubName(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    String clubName = response.body().getClubName();
                    clubNameTextView.setText(clubName);
                } else {
                    Toast.makeText(Home.this, "Failed to load Club Name", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Home.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void getMyTeam(String username) {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().getMyTeam(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Player> players = response.body().getSquad();
                    displayPlayers(players);
                } else {
                    Toast.makeText(Home.this, "Failed to load team", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Home.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void getMoney(String username) {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().getMoney(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    int money = response.body().getMoney();
                    moneyTextView.setText("Money: $" + money);
                } else {
                    Toast.makeText(Home.this, "Failed to load money", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Home.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void getJoinDate(String username) {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().getJoinDate(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    String joinDate = response.body().getJoinDate();
                    joinDateTextView.setText("Join Date: " + joinDate);
                } else {
                    Toast.makeText(Home.this, "Failed to load Join Date", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Home.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayPlayers(List<Player> players) {
        PlayerAdapter adapter = new PlayerAdapter(players);
        playersRecyclerView.setAdapter(adapter);
    }
}
