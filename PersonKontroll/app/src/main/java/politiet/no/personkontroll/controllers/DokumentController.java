package politiet.no.personkontroll.controllers;

import politiet.no.personkontroll.Actions;
import politiet.no.personkontroll.states.State;
import trikita.jedux.Action;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class DokumentController implements Store.Middleware<Action, State> {
    @Override
    public void dispatch(Store<Action, State> store, Action action, Store.NextDispatcher<Action> nextDispatcher) {

        if(action.type instanceof Actions.Dokument)
        {
            //TODO Sett opp com mot API

        }
        nextDispatcher.dispatch(action);

    }
}
