package com.andrej.kicknation.api;

import android.util.Log;

import com.andrej.kicknation.models.LoginResponse;
import com.andrej.kicknation.models.Match;
import com.andrej.kicknation.models.MyTeamResponse;
import com.andrej.kicknation.models.Player;
import com.andrej.kicknation.models.User;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Query;

public interface API {

    @POST("/register")
    Call<ResponseBody> createUser(
            @Body User user
    );


    @POST("/login")
    Call<LoginResponse> userLogin (
            @Body User user
    );

    @GET("/myTeam")
    Call<MyTeamResponse> getMyTeam(@Query("username") String username);

    @GET("/buyPack")
    Call<MyTeamResponse> buyPack(@Query("username") String username);

    @GET("getData")
    Call<MyTeamResponse> getMoney(@Query("username") String username);
    @GET("getData")
    Call<MyTeamResponse> getJoinDate(@Query("username") String username);

    @GET("getData")
    Call<MyTeamResponse> getClubName(@Query("username") String username);

    @GET("/getPlayers")
    Call<MyTeamResponse> getPlayers(@Query("username") String username);

    @PUT("replacePlayer")
    Call<MyTeamResponse> replacePlayer(
            @Query("username") String username,
            @Query("oldPlayerName") String oldPlayerName,
            @Query("newPlayerName") String newPlayerName,
            @Query("newPlayerRating") String newPlayerRating,
            @Query("newPlayerCountry") String newPlayerCountry,
            @Query("newPlayerPosition") String newPlayerPosition
    );

    @GET("/getTournamentData")
    Call<List<Match>> getStageMatches(
            @Query("username") String username,
            @Query("tournamentStage") String tournamentStage
    );
}
