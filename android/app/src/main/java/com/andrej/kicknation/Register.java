package com.andrej.kicknation;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.andrej.kicknation.api.RetrofitClient;
import com.andrej.kicknation.models.User;

import java.io.IOException;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Register extends AppCompatActivity implements View.OnClickListener {

    private EditText usernameText, passwordText, clubNameText;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        usernameText = findViewById(R.id.registerUsername);
        passwordText = findViewById(R.id.registerPassword);
        clubNameText = findViewById(R.id.registerClubName);

        // Set click listeners for both buttons
        findViewById(R.id.userRegisterBtn).setOnClickListener(this);
        findViewById(R.id.loginBtn).setOnClickListener(this);
    }

    private void userRegister() {
        String username = usernameText.getText().toString().trim();
        String password = passwordText.getText().toString().trim();
        String clubName = clubNameText.getText().toString().trim();

        if (username.isEmpty() || password.isEmpty() || clubName.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        User user = new User(username, password, clubName);
        Call<ResponseBody> call = RetrofitClient.getInstance().getAPI().createUser(user);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful() && response.body() != null) {
                    try {
                        String body = response.body().string();
                        Toast.makeText(Register.this, body, Toast.LENGTH_LONG).show();
                        goToLogin();
                    } catch (IOException e) {
                        e.printStackTrace();
                        Toast.makeText(Register.this, "Error processing response", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(Register.this, "Registration failed: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable throwable) {
                Toast.makeText(Register.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void goToLogin() {
        startActivity(new Intent(this, Login.class));
        finish();
    }

    private void goToLoginScreen() {
        Intent intent = new Intent(this, Login.class);
        startActivity(intent);
        finish();
    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        if (id == R.id.userRegisterBtn) {
            userRegister();
        } else if (id == R.id.loginBtn) {
            goToLoginScreen();
        }
    }
}
