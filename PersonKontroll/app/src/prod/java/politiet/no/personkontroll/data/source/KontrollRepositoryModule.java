package politiet.no.personkontroll.data.source;
import android.content.Context;
import javax.inject.Singleton;
import dagger.Module;
import dagger.Provides;
import politiet.no.personkontroll.data.source.Remote;
import politiet.no.personkontroll.data.source.bruker.BrukerRepository;
import politiet.no.personkontroll.data.source.kontroll.KontrollDataSource;
import politiet.no.personkontroll.data.source.kontroll.KontrollRemoteDataSource;

/**
 * This is used by Dagger to inject the required arguments into the {@link BrukerRepository}.
 */
@Module
public class KontrollRepositoryModule {

    @Singleton
    @Provides
    @Remote
    KontrollDataSource provideKontrollRemoteDataSource() {
        return new KontrollRemoteDataSource();
    }

}
