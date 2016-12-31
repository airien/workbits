package politiet.no.personkontroll.redux.states;

import android.content.Context;

import com.google.common.collect.ImmutableList;

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
                    .dokument(reduceDokument(action, currentState.dokument()))
                    .person(reducePerson(action, currentState.person()))
                    .varsler(reduceVarsler(action,currentState.varsler()))
                    .bruker(reduceBruker(action,currentState.bruker()))
                    .build();
        }
        Dokument reduceDokument(Action action, Dokument dokument) {
            if (action.type instanceof Actions.Dokument) {
                Actions.Dokument type = (Actions.Dokument) action.type;
                switch (type) {
                    case HENT:
                        return ImmutableDokument.copyOf(dokument);
                }
            }
            return dokument;
        }
        Person reducePerson(Action action, Person person) {
            if (action.type instanceof Actions.Person) {
                Actions.Person type = (Actions.Person) action.type;
                switch (type) {
                    case HENT:
                        return ImmutablePerson.copyOf(person);
                }
            }
            return person;
        }

        List<Varsel> reduceVarsler(Action action, List<Varsel> varsler) {
            if (action.type instanceof Actions.Varsel) {
                Actions.Varsel type = (Actions.Varsel) action.type;
                switch (type) {
                    case HENT:
                        return ImmutableList.copyOf(varsler);
                }
            }
            return varsler;
        }
        Bruker reduceBruker(Action action, Bruker bruker) {
            if (action.type instanceof Actions.Bruker) {
                Actions.Bruker type = (Actions.Bruker) action.type;
                switch (type) {
                    case HENT:
                        return ImmutableBruker.copyOf(bruker);
                }
            }
            return bruker;
        }
    }
//TODO: hent dette fra tjeneste
    static class Default {
        public static State build(Context c) {
            return ImmutableState.builder()
                    .side(Actions.Side.FORSIDE)
                    .dokument(ImmutableDokument.builder()
                    .id((Math.floor(Math.random() * 100) + 1)+"")
                    .type("PASS").build())
                    .person(ImmutablePerson.builder()
                    .navn("ikke satt")
                    .id((Math.floor(Math.random() * 100) + 1)+"").build())
                    .bruker(ImmutableBruker.builder()
                            .type("TEST")
                            .navn("testbruker")
                            .id((Math.floor(Math.random() * 100) + 1)+"").build())
                    .build();
        }
    }
}
