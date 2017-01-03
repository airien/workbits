package politiet.no.personkontroll.ui;

/**
 * Created by hanne.roos on 31.12.2016.
 */

import android.widget.LinearLayout;

import politiet.no.personkontroll.R;
import politiet.no.personkontroll.Actions;
import politiet.no.personkontroll.PersonKontrollApp;
import trikita.jedux.Action;

import static trikita.anvil.DSL.linearLayout;
import static trikita.anvil.DSL.onClick;
import static trikita.anvil.DSL.orientation;
import static trikita.anvil.DSL.text;
import static trikita.anvil.DSL.withId;
import static trikita.anvil.DSL.xml;

public class Forside {

    public static void view() {
         linearLayout(() -> {
            orientation(LinearLayout.VERTICAL);
            header();
            hoveddel();
        });
    }

    private static void hoveddel() {
        xml(R.layout.forside_frag, () -> {

            withId(R.id.dokument, ()-> {
                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.DOKUMENT));
                });
            });
            withId(R.id.personfoto, ()-> {
                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.PERSONFOTO));
                });
            });
            withId(R.id.fingeravtrykk, ()-> {
                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.FIGERAVTRYKK));
                });
            });
            withId(R.id.nummerskilt, ()-> {
                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.NUMMERSKILT));
                });
            });
            withId(R.id.sok, ()-> {
                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.SOK));
                });
            });
            withId(R.id.historikk, ()-> {
                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.HISTORIKK));
                });
            });
        });
    }

    public static void header ()
    {
        xml(R.layout.header_frag, () -> {

        withId(R.id.header_title, ()-> {
            // button state may depend on some variable
            text(R.string.title_activity_forside);

        });
            withId(R.id.Bruker, ()-> {
                // button state may depend on some variable
                onClick(v->{

                });
            });
        });
    }




}
