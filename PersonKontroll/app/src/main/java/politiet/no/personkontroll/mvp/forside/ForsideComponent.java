package politiet.no.personkontroll.mvp.forside;

import politiet.no.personkontroll.mvp.PersonkontrollApplication;
import politiet.no.personkontroll.data.source.kontroll.KontrollRepositoryComponent;
import politiet.no.personkontroll.mvp.util.FragmentScoped;

import dagger.Component;
import politiet.no.personkontroll.data.source.bruker.BrukerRepositoryComponent;

/**
 * This is a Dagger component. Refer to {@link PersonkontrollApplication} for the list of Dagger components
 * used in this application.
 * <P>
 * Because this component depends on the {@link BrukerRepositoryComponent}, which is a singleton, a
 * scope must be specified. All fragment components use a custom scope for this purpose.
 */
@FragmentScoped
@Component(dependencies = {KontrollRepositoryComponent.class}, modules = {ForsidePresenterModule.class})
public interface ForsideComponent {
    void inject(ForsideActivity forsideActivity);
}

