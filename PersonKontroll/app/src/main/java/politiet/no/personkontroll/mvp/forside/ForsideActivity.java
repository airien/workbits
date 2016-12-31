package politiet.no.personkontroll.mvp.forside;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import javax.inject.Inject;

import politiet.no.personkontroll.mvp.PersonkontrollApplication;
import politiet.no.personkontroll.R;
import politiet.no.personkontroll.mvp.util.ActivityUtils;

public class ForsideActivity extends AppCompatActivity {

    @Inject ForsidePresenter mForsidePresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.forside_act);

        // Set up the toolbar.
//        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
//        setSupportActionBar(toolbar);
//        ActionBar ab = getSupportActionBar();
//        ab.setDisplayHomeAsUpEnabled(true);
//        ab.setDisplayShowHomeEnabled(true);

        ForsideFragment contentfragment = (ForsideFragment) getSupportFragmentManager()
                .findFragmentById(R.id.contentFrame);

        if (contentfragment == null) {
            contentfragment = ForsideFragment.newInstance();

            ActivityUtils.addFragmentToActivity(getSupportFragmentManager(),
                    contentfragment, R.id.contentFrame);
        }


        // Create the presenter
        DaggerForsideComponent.builder()
                .forsidePresenterModule(new ForsidePresenterModule(contentfragment))
                .kontrollRepositoryComponent(((PersonkontrollApplication) getApplication()).getKontrollRepositoryComponent())
                .build()
                .inject(this);

    }
}
