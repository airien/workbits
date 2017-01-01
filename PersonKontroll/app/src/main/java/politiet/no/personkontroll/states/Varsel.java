package politiet.no.personkontroll.states;

import com.google.common.collect.ImmutableList;

import org.immutables.value.Value;

import java.util.List;

import politiet.no.personkontroll.Actions;
import trikita.jedux.Action;

/**
 * Created by hanne.roos on 31.12.2016.
 */

@Value.Immutable
public abstract class Varsel {
    public Varsel() {}
    public abstract String melding();


    public static List<Varsel> reduceVarsler(Action action, List<Varsel> varsler) {
        if (action.type instanceof Actions.Varsel) {
            Actions.Varsel type = (Actions.Varsel) action.type;
            switch (type) {
                case HENT:
                    return ImmutableList.copyOf(varsler);
            }
        }
        return varsler;
    }
}
