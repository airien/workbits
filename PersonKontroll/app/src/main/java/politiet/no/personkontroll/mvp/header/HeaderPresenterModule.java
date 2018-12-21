package politiet.no.personkontroll.mvp.header;

import dagger.Module;
import dagger.Provides;

/**
 * This is a Dagger module. We use this to pass in the View dependency to the
 * {@link HeaderPresenter}.
 */
@Module
public class HeaderPresenterModule {

    private final HeaderContract.View mView;


    public HeaderPresenterModule(HeaderContract.View view) {
        mView = view;
    }

    @Provides
    HeaderContract.View provideTaskDetailContractView() {
        return mView;
    }
}
