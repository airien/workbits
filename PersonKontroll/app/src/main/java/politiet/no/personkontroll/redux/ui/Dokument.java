package politiet.no.personkontroll.redux.ui;

import android.widget.LinearLayout;

import politiet.no.personkontroll.redux.Actions;
import politiet.no.personkontroll.redux.PersonKontrollApp;
import politiet.no.personkontroll.redux.states.State;
import trikita.anvil.DSL;
import trikita.jedux.Action;

import static trikita.anvil.BaseDSL.CENTER_VERTICAL;
import static trikita.anvil.BaseDSL.FILL;
import static trikita.anvil.BaseDSL.WRAP;
import static trikita.anvil.BaseDSL.dip;
import static trikita.anvil.BaseDSL.size;
import static trikita.anvil.BaseDSL.textSize;
import static trikita.anvil.BaseDSL.weight;
import static trikita.anvil.DSL.button;
import static trikita.anvil.DSL.gravity;
import static trikita.anvil.DSL.linearLayout;
import static trikita.anvil.DSL.onClick;
import static trikita.anvil.DSL.orientation;
import static trikita.anvil.DSL.text;
import static trikita.anvil.DSL.textView;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class Dokument {
    public static void view() {
        linearLayout(() -> {
            orientation(LinearLayout.VERTICAL);
            header();
            hoveddel();
        });
    }

    private static void hoveddel() {

        linearLayout(() -> {
            size(FILL, WRAP);
            gravity(CENTER_VERTICAL);

            textView(() -> {
                size(WRAP, WRAP);
                weight(1f);
                textSize(dip(20));
                DSL.text("Er vi på riktig side?");
            });

            button(() -> {
                DSL.text("Tilbake!");

                onClick(v->{
                    PersonKontrollApp.dispatch(new Action<>(Actions.Side.FORSIDE));
                });
            });
        });
    }

    private static void header() {

        State state = PersonKontrollApp.getState();
        linearLayout(() -> {
            size(FILL, WRAP);
            gravity(CENTER_VERTICAL);

            textView(() -> {
                size(WRAP, WRAP);
                weight(1f);
                textSize(dip(20));
                DSL.text(state.side().toString());
            });
        });
    }
}
