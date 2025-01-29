package com.andrej.kicknation;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class DialogAdapter extends ArrayAdapter<String> {
    private final Context context;
    private final String[] playerNames;

    public DialogAdapter(Context context, String[] playerNames) {
        super(context, android.R.layout.simple_list_item_1, playerNames);
        this.context = context;
        this.playerNames = playerNames;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(android.R.layout.simple_list_item_1, parent, false);
        }


        TextView textView = (TextView) convertView.findViewById(android.R.id.text1);
        textView.setText(playerNames[position]);
        textView.setTextColor(context.getResources().getColor(R.color.material_dynamic_neutral95));

        return convertView;
    }
}

