package com.andrej.kicknation;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.andrej.kicknation.api.RetrofitClient;
import com.andrej.kicknation.models.LoginResponse;
import com.andrej.kicknation.models.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login extends AppCompatActivity implements View.OnClickListener {

    private EditText usernameText, passwordText;

    @Override
    protected void onCreate(Bundle savedInstanceSaved) {
        super.onCreate(savedInstanceSaved);
        setContentView(R.layout.activity_login);

        usernameText = findViewById(R.id.loginUsername);
        passwordText = findViewById(R.id.loginPassword);

        findViewById(R.id.userLoginBtn).setOnClickListener(this);
        findViewById(R.id.registerBtn).setOnClickListener(this); // Add this line
    }

    private void userLogin() {
        String username = usernameText.getText().toString().trim();
        String password = passwordText.getText().toString().trim();

        if (username.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please enter both username and password", Toast.LENGTH_SHORT).show();
            return;
        }

        User user = new User(username, password, "N/A");
        Call<LoginResponse> call = RetrofitClient.getInstance().getAPI().userLogin(user);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();

                    if (!loginResponse.isError()) {
                        goToHome(loginResponse.getUser().getUsername());
                    } else {
                        Toast.makeText(Login.this, loginResponse.getMessage(), Toast.LENGTH_LONG).show();
                    }
                } else {
                    Toast.makeText(Login.this, "Login failed, please try again.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable throwable) {
                Toast.makeText(Login.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void goToHome(String username) {
        Intent intent = new Intent(Login.this, Home.class);
        intent.putExtra("USERNAME", username);
        startActivity(intent);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.userLoginBtn) {
            userLogin();
        } else if (view.getId() == R.id.registerBtn) {
            goToRegister();
        }
    }

    private void goToRegister() {
        Intent intent = new Intent(Login.this, Register.class);
        startActivity(intent);
    }
}
