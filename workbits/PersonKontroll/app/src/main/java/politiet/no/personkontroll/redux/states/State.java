package politiet.no.personkontroll.redux.states;

import android.content.Context;

import org.immutables.gson.Gson;
import org.immutables.value.Value;

import java.util.List;

import politiet.no.personkontroll.redux.Actions;
import trikita.jedux.Action;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

@Value.Immutable
@Gson.TypeAdapters
public interface State {
    Actions.Side side();
    Dokument dokument();
    Person person();
    Bruker bruker();
    List<Varsel> varsler();

    class Reducer implements Store.Reducer<Action, State> {
        public State reduce(Action action, State currentState) {
            Actions.Side current = currentState.side();
            if (action.type instanceof Actions.Side) {
                current = (Actions.Side) action.type;
            }

            return ImmutableState.builder().from(currentState)
                    .side(current)
                    .dokument(Dokument.reduceDokument(action, currentState.dokument()))
                    .person(Person.reducePerson(action, currentState.person()))
                    .varsler(Varsel.reduceVarsler(action,currentState.varsler()))
                    .bruker(Bruker.reduceBruker(action,currentState.bruker()))
                    .build();
        }
    }
    //TODO: hent dette fra tjeneste
    static class Default {
        public static State build(Context c) {
            return ImmutableState.builder()
                    .side(Actions.Side.FORSIDE)
                    .dokument(Dokument.buildDefault())
                    .person(Person.buildDefault())
                    .bruker(Bruker.buildDefault())
                    .build();
        }
    }
}
