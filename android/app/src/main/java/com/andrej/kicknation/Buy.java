package com.andrej.kicknation;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.andrej.kicknation.api.RetrofitClient;
import com.andrej.kicknation.models.MyTeamResponse;
import com.andrej.kicknation.models.Player;

import java.util.List;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Buy extends AppCompatActivity {

    private TextView moneyTextView;
    private TextView player1IdTextView;
    private TextView player1NameTextView;
    private TextView player1RatingTextView;
    private TextView player1CountryTextView;
    private TextView player1PositionTextView;
    private Button replacePlayer1Button;

    private TextView player2IdTextView;
    private TextView player2NameTextView;
    private TextView player2RatingTextView;
    private TextView player2CountryTextView;
    private TextView player2PositionTextView;
    private Button replacePlayer2Button;

    private Button buyPackButton;

    private String username;
    private static final String TAG = "BuyActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_buy);


        username = getIntent().getStringExtra("USERNAME");

        if (username == null || username.isEmpty()) {
            Toast.makeText(this, "Username is missing", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }


        moneyTextView = findViewById(R.id.moneyTextView);
        player1IdTextView = findViewById(R.id.player1IdTextView);
        player1NameTextView = findViewById(R.id.player1NameTextView);
        player1RatingTextView = findViewById(R.id.player1RatingTextView);
        player1CountryTextView = findViewById(R.id.player1CountryTextView);
        player1PositionTextView = findViewById(R.id.player1PositionTextView);
        replacePlayer1Button = findViewById(R.id.replacePlayer1Button);

        player2IdTextView = findViewById(R.id.player2IdTextView);
        player2NameTextView = findViewById(R.id.player2NameTextView);
        player2RatingTextView = findViewById(R.id.player2RatingTextView);
        player2CountryTextView = findViewById(R.id.player2CountryTextView);
        player2PositionTextView = findViewById(R.id.player2PositionTextView);
        replacePlayer2Button = findViewById(R.id.replacePlayer2Button);

        buyPackButton = findViewById(R.id.buyPackButton);


        getMoney();


        buyPackButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getMoney(new MoneyCallback() {
                    @Override
                    public void onSuccess(int money) {
                        if (money < 100) {
                            Toast.makeText(Buy.this, "Not enough money.", Toast.LENGTH_SHORT).show();
                        } else {
                            buyPack();
                        }
                    }

                    @Override
                    public void onFailure() {

                    }
                });
            }
        });


        replacePlayer1Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getPlayerForReplacement(1);
            }
        });

        replacePlayer2Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getPlayerForReplacement(2);
            }
        });


        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.nav_buy);
        bottomNavigationView.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.nav_home:

                        Intent homeIntent = new Intent(Buy.this, Home.class);
                        homeIntent.putExtra("USERNAME", username);
                        startActivity(homeIntent);
                        return true;
                    case R.id.nav_play:

                        Intent playIntent = new Intent(Buy.this, Play.class);
                        playIntent.putExtra("USERNAME", username);
                        startActivity(playIntent);
                        return true;
                    case R.id.nav_buy:

                        return true;
                }
                return false;
            }
        });
    }

    private void getMoney() {
        getMoney(new MoneyCallback() {
            @Override
            public void onSuccess(int money) {
                moneyTextView.setText("Money: $" + money);
            }

            @Override
            public void onFailure() {
                moneyTextView.setText("Error fetching money");
            }
        });
    }

    private void getMoney(final MoneyCallback callback) {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().getMoney(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    MyTeamResponse myTeamResponse = response.body();
                    int money = myTeamResponse.getMoney();
                    callback.onSuccess(money);
                } else {
                    Toast.makeText(Buy.this, "Failed to get money", Toast.LENGTH_SHORT).show();
                    callback.onFailure();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Buy.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                callback.onFailure();
            }
        });
    }


    interface MoneyCallback {
        void onSuccess(int money);
        void onFailure();
    }

    private void buyPack() {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().buyPack(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    MyTeamResponse myTeamResponse = response.body();
                    List<Player> players = myTeamResponse.getSquad();

                    if (players.size() >= 2) {
                        Player player1 = players.get(0);
                        Player player2 = players.get(1);
                        Log.d(TAG, "Player 1 Name: " + player1);



                        player1IdTextView.setText(player1.getId());
                        player1NameTextView.setText(player1.getName());
                        player1RatingTextView.setText(player1.getRating());
                        player1CountryTextView.setText(player1.getCountry());
                        player1PositionTextView.setText(player1.getPosition());

                        player2IdTextView.setText(player2.getId());
                        player2NameTextView.setText(player2.getName());
                        player2RatingTextView.setText(player2.getRating());
                        player2CountryTextView.setText(player2.getCountry());
                        player2PositionTextView.setText(player2.getPosition());
                    }


                    getMoney();
                } else {
                    Toast.makeText(Buy.this, "Failed to buy pack", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Buy.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void getPlayerForReplacement(int playerNumber) {
        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().getPlayers(username);

        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    MyTeamResponse myTeamResponse = response.body();
                    List<Player> squad = myTeamResponse.getSquad();


                    Log.d(TAG, "Squad from API: " + squad);

                    Player newPlayer = playerNumber == 1 ?
                            new Player(
                                    player1NameTextView.getText().toString(),
                                    player1PositionTextView.getText().toString(),
                                    player1RatingTextView.getText().toString(),
                                    player1CountryTextView.getText().toString(),
                                    player1IdTextView.getText().toString()
                            ) :
                            new Player(
                                    player2NameTextView.getText().toString(),
                                    player2PositionTextView.getText().toString(),
                                    player2RatingTextView.getText().toString(),
                                    player2CountryTextView.getText().toString(),
                                    player2IdTextView.getText().toString()
                            );


                    Log.d(TAG, "New player for replacement: " + newPlayer);

                    List<Player> filteredPlayers = getPlayersByPosition(squad, newPlayer.getPosition());


                    Log.d(TAG, "Filtered players: " + filteredPlayers);

                    showReplaceOptions(filteredPlayers, newPlayer);
                } else {
                    Log.e(TAG, "Failed response: " + response.errorBody());
                    Toast.makeText(Buy.this, "Failed to get players", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Log.e(TAG, "API call failure: " + t.getMessage());
                Toast.makeText(Buy.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private List<Player> getPlayersByPosition(List<Player> squad, String position) {

        return squad.stream()
                .filter(player -> player.getPosition().equals(position))
                .collect(Collectors.toList());
    }

    private void showReplaceOptions(List<Player> players, Player oldPlayer) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = getLayoutInflater();
        View dialogView = inflater.inflate(R.layout.dialog_custom, null);
        builder.setView(dialogView);

        TextView dialogTitle = dialogView.findViewById(R.id.dialogTitle);
        dialogTitle.setText("Choose a player to replace with " + oldPlayer.getName());

        ListView playerListView = dialogView.findViewById(R.id.playerListView);
        String[] playerNames = players.stream().map(Player::getName).toArray(String[]::new);


        DialogAdapter adapter = new DialogAdapter(this, playerNames);
        playerListView.setAdapter(adapter);

        playerListView.setOnItemClickListener((parent, view, position, id) -> {
            Player newPlayer = players.get(position);
            Log.d(TAG, "Player to replace: " + newPlayer);
            replacePlayer(newPlayer.getName(), oldPlayer);
        });

        Button closeButton = dialogView.findViewById(R.id.closeButton);
        closeButton.setOnClickListener(v -> {
            builder.create().dismiss();
        });

        builder.setCancelable(true);
        builder.show();
    }




    private void replacePlayer(String oldPlayerId, Player newPlayer) {
        String newPlayerName = newPlayer.getName();
        Log.d(TAG, "Replacing with playerName: " + newPlayerName);
        String newPlayerRating = newPlayer.getRating();
        String newPlayerCountry = newPlayer.getCountry();
        String newPlayerPosition = newPlayer.getPosition();

        Call<MyTeamResponse> call = RetrofitClient.getInstance().getAPI().replacePlayer(username, oldPlayerId, newPlayerName, newPlayerRating, newPlayerCountry, newPlayerPosition);
        call.enqueue(new Callback<MyTeamResponse>() {
            @Override
            public void onResponse(Call<MyTeamResponse> call, Response<MyTeamResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Toast.makeText(Buy.this, "Player replaced successfully", Toast.LENGTH_SHORT).show();

                    getMoney();
                } else {
                    Toast.makeText(Buy.this, "Failed to replace player", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<MyTeamResponse> call, Throwable t) {
                Toast.makeText(Buy.this, t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}