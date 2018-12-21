package politiet.no.personkontroll.data.source;
import android.content.Context;
import javax.inject.Singleton;
import dagger.Module;
import dagger.Provides;
import politiet.no.personkontroll.data.FakeBrukerRemoteDataSource;
import politiet.no.personkontroll.data.source.bruker.BrukerDataSource;
import politiet.no.personkontroll.data.source.bruker.BrukerRepository;
/**
 * This is used by Dagger to inject the required arguments into the {@link BrukerRepository}.
 */
@Module
public class BrukerRepositoryModule {

    @Singleton
    @Provides
    @Remote
    BrukerDataSource provideBrukerRemoteDataSource() {
        return new FakeBrukerRemoteDataSource();
    }

}
