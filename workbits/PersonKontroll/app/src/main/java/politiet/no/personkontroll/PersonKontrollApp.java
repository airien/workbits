package politiet.no.personkontroll;

import android.app.Application;

import politiet.no.personkontroll.controllers.SideController;
import politiet.no.personkontroll.controllers.PersistanceController;
import politiet.no.personkontroll.controllers.BrukerController;
import politiet.no.personkontroll.data.source.bruker.BrukerRepositoryComponent;
import politiet.no.personkontroll.data.source.bruker.DaggerBrukerRepositoryComponent;
import politiet.no.personkontroll.data.source.kontroll.DaggerKontrollRepositoryComponent;
import politiet.no.personkontroll.data.source.kontroll.KontrollRepositoryComponent;
import politiet.no.personkontroll.daggerhelpers.ApplicationModule;
import politiet.no.personkontroll.states.State;
import trikita.anvil.Anvil;
import trikita.jedux.Action;
import trikita.jedux.Logger;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class PersonKontrollApp  extends Application {

    private BrukerRepositoryComponent mBrukerRepositoryComponent;
    private KontrollRepositoryComponent mKontrollRepositoryComponent;

    private static PersonKontrollApp instance;

    private Store<Action, State> store;

    public static State dispatch(Action action) {
        return instance.store.dispatch(action);
    }

    public static State getState() {
        return instance.store.getState();
    }

    public BrukerRepositoryComponent getBrukerRepositoryComponent() {
        return mBrukerRepositoryComponent;
    }

    public KontrollRepositoryComponent getKontrollRepositoryComponent() {
        return mKontrollRepositoryComponent;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        PersonKontrollApp.instance = this;

        //sette opp repositories i Dagger
        mBrukerRepositoryComponent = DaggerBrukerRepositoryComponent.builder()
                .applicationModule(new ApplicationModule((getApplicationContext())))
                .build();

        mKontrollRepositoryComponent = DaggerKontrollRepositoryComponent.builder()
                .applicationModule(new ApplicationModule((getApplicationContext())))
                .build();

        // sette opp initiering av state
        PersistanceController persistanceController = new PersistanceController(this);
        State initialState = persistanceController.getSavedState();
        if (initialState == null) {
         initialState = State.Default.build(getApplicationContext());
       }

        // sette opp redux store
        this.store = new Store<>(new State.Reducer(),
                initialState,
                new Logger<>("PersonKontroll"),
                new BrukerController(),
                persistanceController,
                new SideController(getApplicationContext()));

        this.store.subscribe(Anvil::render);

    }
}