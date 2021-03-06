package politiet.no.personkontroll.redux.states;

import org.immutables.value.Value;

import politiet.no.personkontroll.redux.Actions;
import trikita.jedux.Action;

/**
 * Created by hanne.roos on 31.12.2016.
 */

@Value.Immutable
public abstract class Dokument {
    public abstract String type();
    public abstract String id();
    public Dokument() {}
    public static Dokument reduceDokument(Action action, Dokument dokument) {
        if (action.type instanceof Actions.Dokument) {
            Actions.Dokument type = (Actions.Dokument) action.type;
            switch (type) {
                case HENT:
                    return ImmutableDokument.copyOf(dokument);
            }
        }
        return dokument;
    }
    public static ImmutableDokument buildDefault()
    {
        return ImmutableDokument.builder()
                .id((Math.floor(Math.random() * 100) + 1)+"")
                .type("PASS").build();
    }
}
