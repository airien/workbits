package politiet.no.personkontroll.mvp.forside;

import dagger.Module;
import dagger.Provides;

/**
 * This is a Dagger module. We use this to pass in the View dependency to the
 * {@link ForsidePresenter}.
 */
@Module
public class ForsidePresenterModule {

    private final ForsideContract.View mView;


    public ForsidePresenterModule(ForsideContract.View view) {
        mView = view;
    }

    @Provides
    ForsideContract.View provideForsideView() {
        return mView;
    }
}
