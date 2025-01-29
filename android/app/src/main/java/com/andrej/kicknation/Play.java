package com.andrej.kicknation;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class Play extends AppCompatActivity {

    private ViewPager2 tournamentViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_play);

        String username = getIntent().getStringExtra("USERNAME");

        if (username == null || username.isEmpty()) {
            Toast.makeText(this, "Username is missing", Toast.LENGTH_SHORT).show();
            return;
        }


        tournamentViewPager = findViewById(R.id.tournamentViewPager);
        TournamentPagerAdapter adapter = new TournamentPagerAdapter(this, username);
        tournamentViewPager.setAdapter(adapter);


        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.nav_play);
        bottomNavigationView.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.nav_home:
                        Intent homeIntent = new Intent(Play.this, Home.class);
                        homeIntent.putExtra("USERNAME", username);
                        startActivity(homeIntent);
                        return true;
                    case R.id.nav_play:
                        return true;
                    case R.id.nav_buy:
                        Intent buyIntent = new Intent(Play.this, Buy.class);
                        buyIntent.putExtra("USERNAME", username);
                        startActivity(buyIntent);
                        return true;
                }
                return false;
            }
        });
    }
}
