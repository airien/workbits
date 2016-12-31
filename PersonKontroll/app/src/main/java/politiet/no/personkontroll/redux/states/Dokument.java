package politiet.no.personkontroll.redux.states;

import org.immutables.value.Value;

/**
 * Created by hanne.roos on 31.12.2016.
 */

@Value.Immutable
public abstract class Dokument {
    public abstract String type();
    public abstract String id();
    public Dokument() {}

}
