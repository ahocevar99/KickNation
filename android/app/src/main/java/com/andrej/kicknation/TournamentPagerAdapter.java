package com.andrej.kicknation;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.andrej.kicknation.fragments.FinalFragment;
import com.andrej.kicknation.fragments.QuarterFinalFragment;
import com.andrej.kicknation.fragments.RoundOf16Fragment;
import com.andrej.kicknation.fragments.SemiFinalFragment;

public class TournamentPagerAdapter extends FragmentStateAdapter {

    private final String username;

    public TournamentPagerAdapter(@NonNull FragmentActivity fragmentActivity, String username) {
        super(fragmentActivity);
        this.username = username;
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position) {
            case 0:
                return RoundOf16Fragment.newInstance(username);
            case 1:
                return QuarterFinalFragment.newInstance(username);
            case 2:
                return SemiFinalFragment.newInstance(username);
            case 3:
                return FinalFragment.newInstance(username);
            default:
                return RoundOf16Fragment.newInstance(username);
        }
    }

    @Override
    public int getItemCount() {
        return 4;
    }
}
