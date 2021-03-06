
package politiet.no.personkontroll.data.source.bruker;


import javax.inject.Singleton;

import dagger.Component;
import politiet.no.personkontroll.PersonKontrollApp;
import politiet.no.personkontroll.daggerhelpers.ApplicationModule;
import politiet.no.personkontroll.data.source.BrukerRepositoryModule;

/**
 * This is a Dagger component. Refer to {@link PersonKontrollApp} for the list of Dagger components
 * used in this application.
 * <P>
 * Even though Dagger allows annotating a {@link Component @Component} as a singleton, the code
 * itself must ensure only one instance of the class is created. This is done in {@link
 * PersonKontrollApp}.
 */
@Singleton
@Component(modules = {BrukerRepositoryModule.class, ApplicationModule.class})
public interface BrukerRepositoryComponent {
    BrukerRepository getBrukerRepository();
}
