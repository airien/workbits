package politiet.no.personkontroll.mvp.util;

import android.support.v7.app.AlertDialog;

/**
 * Created by hanne.roos on 29.12.2016.
 */

public class AlertBox {
    public static void Show(String text)
    {
        AlertDialog.Builder dlgAlert  = new AlertDialog.Builder(null);
        dlgAlert.setMessage(text);
        dlgAlert.setTitle("PersonKontroll");
        dlgAlert.setPositiveButton("OK", null);
        dlgAlert.setCancelable(true);
        dlgAlert.create().show();
    }


}

