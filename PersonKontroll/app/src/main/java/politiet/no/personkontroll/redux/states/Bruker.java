package politiet.no.personkontroll.redux.states;

import org.immutables.value.Value;

/**
 * Created by hanne.roos on 31.12.2016.
 */
@Value.Immutable
public abstract class Bruker {
    public abstract String type();
    public abstract String id();
    public abstract String navn();
    public Bruker() {}
}
