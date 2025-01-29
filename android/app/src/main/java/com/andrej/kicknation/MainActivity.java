package com.andrej.kicknation;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate (Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.registerBtn).setOnClickListener(this);
        findViewById(R.id.loginBtn).setOnClickListener(this);
    }

    private void userSignUp() {
        startActivity(new Intent(this, Register.class));
    }
    private void userLogin(){
        startActivity(new Intent(this, Login.class));
    }

    @Override
    public void onClick(View view){
        int id = view.getId();
        if (id == R.id.registerBtn) {
            userSignUp();
        }
        if (id == R.id.loginBtn) {
            userLogin();
        }
    }
}
