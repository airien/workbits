package politiet.no.personkontroll.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import politiet.no.personkontroll.ui.Dokument;
import politiet.no.personkontroll.ui.SubView;
import trikita.anvil.RenderableView;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class SubActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new RenderableView(this) {
            public void view() {
                SubView.view();
            }
        });
    }

}
