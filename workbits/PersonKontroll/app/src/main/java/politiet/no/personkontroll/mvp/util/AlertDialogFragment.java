package politiet.no.personkontroll.mvp.util;

import android.app.Dialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AlertDialog;

/**
 * Created by hanne.roos on 29.12.2016.
 */

public class AlertDialogFragment extends DialogFragment {
    private String mText;
    private String mTitle;

    public AlertDialogFragment() {
        setValues("no text", "no title");
    }

    public void setValues(String text, String title){
        this.mText = text;
        this.mTitle = title;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {

        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setTitle(mTitle);
        builder.setMessage(mText);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                // You don't have to do anything here if you just want it dismissed when clicked
            }
        });

        // Create the AlertDialog object and return it
        return builder.create();
    }
}