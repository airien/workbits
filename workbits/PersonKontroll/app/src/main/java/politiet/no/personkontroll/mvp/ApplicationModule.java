
package politiet.no.personkontroll.mvp;
import android.content.Context;

import dagger.Module;
import dagger.Provides;
import politiet.no.personkontroll.data.source.bruker.BrukerRepositoryComponent;

/**
 * This is a Dagger module. We use this to pass in the Context dependency to the
 * {@link
 * BrukerRepositoryComponent}.
 */
@Module
public final class ApplicationModule {

    private final Context mContext;

    ApplicationModule(Context context) {
        mContext = context;
    }

    @Provides
    Context provideContext() {
        return mContext;
    }
}