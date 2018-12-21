package politiet.no.personkontroll.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import politiet.no.personkontroll.ui.Forside;
import trikita.anvil.RenderableView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new RenderableView(this) {
            public void view() {
                Forside.view();
            }
        });
    }

}
