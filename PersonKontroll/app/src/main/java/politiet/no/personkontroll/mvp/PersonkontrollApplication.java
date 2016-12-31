package politiet.no.personkontroll.mvp;

import android.app.Application;

import politiet.no.personkontroll.data.source.bruker.BrukerRepositoryComponent;
import politiet.no.personkontroll.data.source.bruker.DaggerBrukerRepositoryComponent;
import politiet.no.personkontroll.data.source.kontroll.DaggerKontrollRepositoryComponent;
import politiet.no.personkontroll.data.source.kontroll.KontrollRepositoryComponent;
import politiet.no.personkontroll.mvp.forside.ForsideComponent;
import politiet.no.personkontroll.mvp.header.HeaderComponent;

/**
 * Even though Dagger2 allows annotating a {@link dagger.Component} as a singleton, the code itself
 * must ensure only one instance of the class is created. Therefore, we create a custom
 * {@link Application} class to store a singleton reference to the {@link
 * BrukerRepositoryComponent}.
 * <P>
 * The application is made of 5 Dagger components, as follows:<BR />
 * {@link BrukerRepositoryComponent}: the data (it encapsulates a db and server data)<BR />
 * {@link BrukerRepositoryComponent}: showing the list of to do items, including marking them as
 * completed<BR />
 * {@link ForsideComponent}: First page of the app<BR />
 * {@link HeaderComponent}: Felles header i applikasjonen
 * completed and deleting it<BR />
 */
public class PersonkontrollApplication extends Application {

    private BrukerRepositoryComponent mBrukerRepositoryComponent;
    private KontrollRepositoryComponent mKontrollRepositoryComponent;

    @Override
    public void onCreate() {
        super.onCreate();

        mBrukerRepositoryComponent = DaggerBrukerRepositoryComponent.builder()
                .applicationModule(new ApplicationModule((getApplicationContext())))
                .build();

        mKontrollRepositoryComponent = DaggerKontrollRepositoryComponent.builder()
                .applicationModule(new ApplicationModule((getApplicationContext())))
                .build();

    }

    public BrukerRepositoryComponent getBrukerRepositoryComponent() {
        return mBrukerRepositoryComponent;
    }

    public KontrollRepositoryComponent getKontrollRepositoryComponent() {
        return mKontrollRepositoryComponent;
    }
}
