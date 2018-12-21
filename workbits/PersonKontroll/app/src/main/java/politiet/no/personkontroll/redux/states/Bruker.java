package politiet.no.personkontroll.redux.states;

import org.immutables.value.Value;

import politiet.no.personkontroll.redux.Actions;
import trikita.jedux.Action;

/**
 * Created by hanne.roos on 31.12.2016.
 */
@Value.Immutable
public abstract class Bruker {
    public abstract String type();
    public abstract String id();
    public abstract String navn();
    public Bruker() {}


    public static Bruker reduceBruker(Action action, Bruker bruker) {
        if (action.type instanceof Actions.Bruker) {
            Actions.Bruker type = (Actions.Bruker) action.type;
            switch (type) {
                case HENT:
                    return ImmutableBruker.copyOf(bruker);
            }
        }
        return bruker;
    }

    public static ImmutableBruker buildDefault() {
        return ImmutableBruker.builder()
                .type("TEST")
                .navn("testbruker")
                .id((Math.floor(Math.random() * 100) + 1)+"").build();
    }
}
