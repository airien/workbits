package politiet.no.personkontroll.activities;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.FormatException;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.IsoDep;
import android.nfc.tech.Ndef;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.util.Xml;
import android.widget.Toast;

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

import org.jmrtd.lds.COMFile;
import org.jmrtd.lds.SODFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Random;

import no.politiet.chipwrapper.ChipData;
import no.politiet.chipwrapper.ChipReaderService;
import politiet.no.personkontroll.Actions;
import politiet.no.personkontroll.PersonKontrollApp;
import politiet.no.personkontroll.states.State;
import politiet.no.personkontroll.ui.Chip;
import politiet.no.personkontroll.ui.Dokument;
import trikita.anvil.RenderableView;
import trikita.jedux.Action;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class LesChipActivity extends AppCompatActivity {


    private NfcAdapter _nfcAdapter;
    private Context _context;
    private boolean _inWriteMode;
    public final String ViewApeMimeType = "application/vnd.xamarin.nfcxample";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new RenderableView(this) {
            public void view() {
                Chip.view();
            }
        });


        _context = getBaseContext();
        _nfcAdapter = NfcAdapter.getDefaultAdapter(_context);
    }

    @Override
    public void onStart()
    {
        super.onStart();

       // else

    }

    @Override
    public void onResume()
    {
        super.onResume();
        if(!_inWriteMode)
            initNFC();
    }

    @Override
    protected void onNewIntent(Intent intent)
    {
        super.onNewIntent(intent);
        try
        {
            activateNFCListeningMode(intent);
        }
        catch (Exception ex)
        {

            PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"could not activate intent: "+ex.getMessage()));
            //Insights.Report(ex, Insights.Severity.Error);

        }
    }

    private void initNFC()
    {
        _inWriteMode = true;

        PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"Init NFC"));
        State state = PersonKontrollApp.getState();

        IntentFilter tagDetected = new IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED);
        IntentFilter[] filters = new IntentFilter[] { tagDetected };

        Intent intent = new Intent(_context, LesChipActivity.class);

        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);

        if (_nfcAdapter == null)
        {
            Toast toast = Toast.makeText(_context, "NFC is not supported on this device.", Toast.LENGTH_SHORT);
            toast.notify();
        }
        else if (state.dokument().documentNumber().isEmpty()) {
            Toast toast = Toast.makeText(_context, "MRZ is not read or manual document info is not registered", Toast.LENGTH_SHORT);
            toast.notify();
        }
        else
            try
            {
                _nfcAdapter.enableForegroundDispatch(this, pendingIntent, filters, null);
            }
            catch (Exception ex)
            {
                Toast toast = Toast.makeText(_context, "Cannot set foreground dispatch on the current activity", Toast.LENGTH_SHORT);
                toast.notify();
            }
    }

    public void activateNFCListeningMode(Intent intent)
    {
        if (_inWriteMode)
        {

            PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"Activating listeningmode"));
            //_inWriteMode = false; TODO: Do not disable before navigating away....
            Tag tag = (Tag)intent.getParcelableExtra(NfcAdapter.EXTRA_TAG) ;

            if (tag == null)
            {
                return;
            }

            // These next few lines will create a payload (consisting of a string)
            // and a mimetype. NFC record are arrays of bytes.
            byte[] payload = getRandomHominid().getBytes(StandardCharsets.US_ASCII);;
            byte[] mimeBytes = ViewApeMimeType.getBytes(StandardCharsets.US_ASCII);
            NdefRecord apeRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA, mimeBytes, new byte[0], payload);
            NdefMessage ndefMessage = new NdefMessage(new NdefRecord[] { apeRecord });

            if (Arrays.asList(tag.getTechList()).contains("android.nfc.tech.IsoDep"))
            {
                if (!tryAndWriteToTag(tag, ndefMessage))
                {
                    // Maybe the write couldn't happen because the tag wasn't formatted?
                    tryAndFormatTagWithMessage(tag, ndefMessage);
                }
            }
        }
    }

    private void tryAndFormatTagWithMessage(Tag tag, NdefMessage ndefMessage) {

        PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"tryAndFormatTagWithMessage"));
        String[] techList = tag.getTechList();
        StringBuilder techListString = new StringBuilder();

        if (techList != null)
        {
            Log.d("Chip","Tech in tag: ");

            for (String tech : techList)
            {
                techListString.append(tech + " ");
                Log.d("Chip",tech);
            }
        }

        if (Arrays.asList(techList).contains("android.nfc.tech.IsoDep"))
        {
            IsoDep isoDepTag = null;

            try
            {
                isoDepTag = IsoDep.get(tag);
                isoDepTag.setTimeout(10000);
            }
            catch (Exception ex)
            {
                writeStatus("Could not get IsoDep tag. Error: "+ex.getMessage());
            }

            try
            {
                PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"reading tag"));
                DateFormat format = new SimpleDateFormat("yyMMdd");
                politiet.no.personkontroll.states.Dokument doc = PersonKontrollApp.getState().dokument();
                ChipReaderService chipService = new ChipReaderService(isoDepTag, _context);

                String docNumber = doc.documentNumber().replace("<", "");
                String dateOfBirth = format.format(doc.dateOfBirth());
                String dateOfExpiry = format.format(doc.dateOfExpiry());

                ChipData chipData = chipService.initUsingBACChipConnection(docNumber, dateOfBirth, dateOfExpiry);
                COMFile com = chipData.comFile;
                if(null!=com)
                {
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"COM file read"));
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.UPDATECOM,com));
                }

                ChipData sodData = chipService.transferChipDataSOD();
                if(null != sodData && null != sodData.sodFile)
                {
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"SOD file read"));
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.UPDATESOD,sodData.sodFile));

                }

                ChipData dg1 = chipService.transferChipDataDG1();
                if(null != dg1 && null != dg1.dg1File)
                {
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"DG1 file read"));
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.UPDATEDG1,dg1.dg1File));
                }

                ChipData dg2 = chipService.transferChipDataDG2(this);
                if(null != dg1 && null != dg1.dg1File)
                {
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,"DG2 file read"));
                    PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.UPDATEDG2,dg2.dg2File));
                }

//                Task.Run(() =>
//                        {
//                return chipService.TransferChipDataDG2(_context);
//                }).ContinueWith((t2) =>
//                    {
//
//                            chipData.Dg2Bitmap = t2.Result.Dg2Bitmap;
//                //chipData.Dg1ByteArray = t2.Result.Dg1ByteArray;
//
//                //Bitmap bitmap = null;
//
//                if (!chipData.IsSuccess || chipData.Dg2Bitmap == null) {
//                    Console.WriteLine($"No bitmap returned from chip. Error message: {chipData.ExceptionMessage}.");
//                    MessagingCenter.Send(new AppMessages.NFCResult(), AppMessages.NFCResultDG2FileMessage, chipData.ComFile.ToString());
//                }
//
//                byte[] imageByteArray = null;
//                using (MemoryStream stream = new MemoryStream())
//                {
//                    chipData.Dg2Bitmap.Compress(Bitmap.CompressFormat.Jpeg, 100, stream);
//                    imageByteArray = stream.ToArray();
//                }
//
//                MessagingCenter.Send(new AppMessages.NFCResult { Dg2BitmapByteArray = imageByteArray }, AppMessages.NFCResultDG2FileMessage, chipData.ComFile.ToString());
//                });
//                });
            }
            catch (Exception ex)
            {
                writeStatus("Extracting IsoDep GetHistoricalBytes data did not work. Error: "+ex.getMessage());
            }
        }

 //       message.Clear();
    }

    private boolean tryAndWriteToTag(Tag tag, NdefMessage ndefMessage)
    {

        try {
        // This object is used to get information about the NFC tag as 
        // well as perform operations on it.
        Ndef ndef = Ndef.get(tag);
        if (ndef != null)
        {
            ndef.connect();

            // Once written to, a tag can be marked as read-only - check for this.
            if (!ndef.isWritable())
            {
                writeStatus("Tag is read-only.");
            }

            // NFC tags can only store a small amount of data, this depends on the type of tag its.
            int size = ndefMessage.toByteArray().length;
            if (ndef.getMaxSize() < size)
            {
                writeStatus("Tag doesn't have enough space.");
            }

                ndef.writeNdefMessage(ndefMessage);

            writeStatus("Succesfully wrote tag.");
            return true;
        }
        } catch (IOException e) {
            writeStatus("error: "+e.getMessage());
        } catch (FormatException e) {
            writeStatus("error: "+e.getMessage());
        }
        return false;
    }

    private void writeStatus(String s) {

        PersonKontrollApp.dispatch(new Action<>(Actions.Dokument.CHIPSTATUSUPDATE,s));
    }

    private String getRandomHominid()
    {
        Random random = new Random();
        double r = random.nextDouble();
      //  Log.Debug(Tag, "Random number: {0}", r.ToString("N2"));
        if (r < 0.25)
        {
            return "heston";
        }
        if (r < 0.5)
        {
            return "gorillas";
        }
        if (r < 0.75)
        {
            return "dr_zaius";
        }
        return "cornelius";
    }
}
