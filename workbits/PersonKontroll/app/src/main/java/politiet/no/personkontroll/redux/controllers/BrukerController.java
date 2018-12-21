package politiet.no.personkontroll.redux.controllers;

import politiet.no.personkontroll.redux.Actions;
import politiet.no.personkontroll.redux.states.State;
import trikita.jedux.Action;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class BrukerController implements Store.Middleware<Action, State> {
    @Override
    public void dispatch(Store<Action, State> store, Action action, Store.NextDispatcher<Action> nextDispatcher) {

        if(action.type instanceof Actions.Bruker)
        {
            //TODO Sett opp com mot API

        }
        nextDispatcher.dispatch(action);

    }
}
