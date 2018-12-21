package politiet.no.personkontroll.data.source;

import android.content.Context;

import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;
import politiet.no.personkontroll.data.FakeKontrollRemoteDataSource;
import politiet.no.personkontroll.data.source.kontroll.KontrollDataSource;
import politiet.no.personkontroll.data.source.kontroll.KontrollRepository;

/**
 * This is used by Dagger to inject the required arguments into the {@link KontrollRepository}.
 */
@Module
public class KontrollRepositoryModule {

    @Singleton
    @Provides
    @Remote
    KontrollDataSource provideKontrollRemoteDataSource() {
        return new FakeKontrollRemoteDataSource();
    }

}
