
package politiet.no.personkontroll.data.source.kontroll;


import javax.inject.Singleton;

import dagger.Component;
import politiet.no.personkontroll.mvp.ApplicationModule;
import politiet.no.personkontroll.mvp.PersonkontrollApplication;
import politiet.no.personkontroll.data.source.KontrollRepositoryModule;

/**
 * This is a Dagger component. Refer to {@link PersonkontrollApplication} for the list of Dagger components
 * used in this application.
 * <P>
 * Even though Dagger allows annotating a {@link Component @Component} as a singleton, the code
 * itself must ensure only one instance of the class is created. This is done in {@link
 * PersonkontrollApplication}.
 */
@Singleton
@Component(modules = {KontrollRepositoryModule.class, ApplicationModule.class})
public interface KontrollRepositoryComponent {

    KontrollRepository getKontrollRepository();
}
