package politiet.no.personkontroll.activities;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcel;
import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;

import com.microblink.activity.ScanActivity;
import com.microblink.activity.ScanCard;
import com.microblink.activity.SegmentScanActivity;
import com.microblink.activity.ShowOcrResultMode;
import com.microblink.hardware.camera.CameraType;
import com.microblink.recognizers.BaseRecognitionResult;
import com.microblink.recognizers.RecognitionResults;
import com.microblink.recognizers.blinkid.mrtd.MRTDRecognizerSettings;
import com.microblink.recognizers.settings.RecognitionSettings;
import com.microblink.recognizers.settings.RecognizerSettings;

import politiet.no.personkontroll.Actions;
import politiet.no.personkontroll.PersonKontrollApp;
import politiet.no.personkontroll.ui.Dokument;
import trikita.anvil.RenderableView;
import trikita.jedux.Action;

import static com.microblink.product.Product.BlinkID;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class DokumentActivity extends AppCompatActivity {

    private static final int MY_REQUEST_CODE = 123;
    public final String LICENSE_KEY = "ARGJSDWR-2237W7FH-4WD6VWAH-3UKPDOZL-E2SDZG6H-HAUPKUG7-QQZEHMEY-TED2VJXL";
    private boolean isReadMode = true;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new RenderableView(this) {
            public void view() {
                Dokument.view();
            }
        });
    }

    @Override
    public void onStart()
    {
        super.onStart();
        if(isReadMode)
            scan();
    }
    @Override
    public void onStop()
    {
        super.onStop();

        PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CLEARDOCUMENT));
    }

    public void scan() {
        isReadMode = false;
        // Intent for ScanCard Activity
        Intent intent = new Intent(this, ScanCard.class);

        intent.putExtra(ScanCard.EXTRAS_LICENSE_KEY, LICENSE_KEY);
        RecognitionSettings settings = new RecognitionSettings();

        settings.setRecognizerSettingsArray(setupSettingsArray());
        intent.putExtra(ScanCard.EXTRAS_RECOGNITION_SETTINGS, settings);
        intent.putExtra(ScanActivity.EXTRAS_SHOW_FOCUS_RECTANGLE, true);
        intent.putExtra(SegmentScanActivity.EXTRAS_SHOW_OCR_RESULT_MODE, (Parcelable) ShowOcrResultMode.STATIC_CHARS);
        intent.putExtra(ScanCard.EXTRAS_CAMERA_TYPE, (Parcelable) CameraType.CAMERA_BACKFACE);

        startActivityForResult(intent, MY_REQUEST_CODE);
    }
    private RecognizerSettings[] setupSettingsArray() {
        MRTDRecognizerSettings sett = new MRTDRecognizerSettings();
        return new RecognizerSettings[] { sett };
    };

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == MY_REQUEST_CODE) {
            if (resultCode == ScanCard.RESULT_OK && data != null) {

                Bundle extras = data.getExtras();
                RecognitionResults result = data.getParcelableExtra(ScanCard.EXTRAS_RECOGNITION_RESULTS);
                BaseRecognitionResult[] resultArray = result.getRecognitionResults();

                isReadMode = false;
                PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.MRZLEST, resultArray));
            }
        }
    }
}
