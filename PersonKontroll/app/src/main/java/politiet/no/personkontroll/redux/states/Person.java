package politiet.no.personkontroll.redux.states;

import org.immutables.value.Value;

import politiet.no.personkontroll.redux.Actions;
import trikita.jedux.Action;

/**
 * Created by hanne.roos on 31.12.2016.
 */

@Value.Immutable
public abstract class Person {
    public abstract String id();
    public abstract String navn();
    public Person() {}

    public static Person reducePerson(Action action, Person person) {
        if (action.type instanceof Actions.Person) {
            Actions.Person type = (Actions.Person) action.type;
            switch (type) {
                case HENT:
                    return ImmutablePerson.copyOf(person);
            }
        }
        return person;
    }

    public static ImmutablePerson buildDefault()
    {
        return ImmutablePerson.builder()
                .navn("ikke satt")
                .id((Math.floor(Math.random() * 100) + 1)+"").build();
    }
}
