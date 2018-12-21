package politiet.no.personkontroll.redux;

import android.app.Application;

import politiet.no.personkontroll.redux.controllers.SideController;
import politiet.no.personkontroll.redux.controllers.PersistanceController;
import politiet.no.personkontroll.redux.controllers.BrukerController;
import politiet.no.personkontroll.redux.states.State;
import trikita.anvil.Anvil;
import trikita.jedux.Action;
import trikita.jedux.Logger;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class PersonKontrollApp  extends Application {

    private static PersonKontrollApp instance;

    private Store<Action, State> store;

    public static State dispatch(Action action) {
        return instance.store.dispatch(action);
    }

    public static State getState() {
        return instance.store.getState();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        PersonKontrollApp.instance = this;

        PersistanceController persistanceController = new PersistanceController(this);
        State initialState = persistanceController.getSavedState();
        if (initialState == null) {
         initialState = State.Default.build(getApplicationContext());
       }

        // TODO setup dagger + repo

        this.store = new Store<>(new State.Reducer(),
                initialState,
                new Logger<>("PersonKontroll"),
                new BrukerController(),
                persistanceController,
                new SideController(getApplicationContext()));

        this.store.subscribe(Anvil::render);
    }
}