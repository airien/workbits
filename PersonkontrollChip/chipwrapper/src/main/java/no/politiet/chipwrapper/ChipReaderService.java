package no.politiet.chipwrapper;

import android.content.Context;
import android.graphics.Bitmap;
import android.nfc.tech.IsoDep;
import android.util.Log;

import net.sf.scuba.smartcards.CardFileInputStream;
import net.sf.scuba.smartcards.CardService;
import net.sf.scuba.smartcards.CardServiceException;

import org.jmrtd.BACKey;
import org.jmrtd.BACKeySpec;
import org.jmrtd.PassportService;
import org.jmrtd.lds.CardAccessFile;
import org.jmrtd.lds.FaceImageInfo;
import org.jmrtd.lds.FaceInfo;
import org.jmrtd.lds.LDS;
import org.jmrtd.lds.PACEInfo;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.Security;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ChipReaderService {

    private IsoDep isoDep;
    private BACKeySpec bacKey;
    private Context context;
    private CardService cardService;
    private PassportService service;
    private LDS lds;

    public ChipReaderService(IsoDep isoDep, Context context) {
        this.isoDep = isoDep;
        this.context = context;
    }

    private ChipData chipData = new ChipData();

    public ChipData initUsingPACEChipConnection(String passportNumber, String dateBirth, String dateExpiry) throws CardServiceException, IOException {

        try {
            bacKey = new BACKey(passportNumber, dateBirth, dateExpiry);
            Log.i("ChipService", "BAC key generated." + bacKey.toString());

            cardService = CardService.getInstance(isoDep);
            cardService.open();

            service = new PassportService(cardService);
            service.open();

            boolean paceSucceeded = false;

            //This section fails.
            Log.i("ChipService", "Getting card access file.");
            CardAccessFile cardAccessFile = new CardAccessFile(service.getInputStream(PassportService.EF_CARD_ACCESS));
            Log.i("ChipService", "Card access file retrieved. Getting PACE Info.");
            Collection<PACEInfo> paceInfos = cardAccessFile.getPACEInfos();
            if (paceInfos != null && paceInfos.size() > 0) {
                    Log.i("ChipService", "Pace info recieved. Size: " + paceInfos.size());
                    PACEInfo paceInfo = paceInfos.iterator().next();
                    Log.i("ChipService", "PaceInfo - object identifier: " + paceInfo.getObjectIdentifier() + " , parameter id: " + paceInfo.getParameterId());
                    service.doPACE(bacKey, paceInfo.getObjectIdentifier(), PACEInfo.toParameterSpec(paceInfo.getParameterId()));
                    paceSucceeded = true;
                } else {
                    paceSucceeded = true;
                }

            chipData.isPaceAuthenticated = paceSucceeded;

            service.sendSelectApplet(paceSucceeded);

            lds = new LDS();

            CardFileInputStream comIn = service.getInputStream(PassportService.EF_COM);
            lds.add(PassportService.EF_COM, comIn, comIn.getLength());
            chipData.comFile = lds.getCOMFile();

        } catch (Exception e) {
            Log.i("ChipService", "Could not authenticate with PACE, try switching to BAC in settings.", e);
            throw e;
        }

        return chipData;
    }

    public ChipData initUsingBACChipConnection(String passportNumber, String dateBirth, String dateExpiry) throws CardServiceException, IOException {

        try {
            bacKey = new BACKey(passportNumber, dateBirth, dateExpiry);
            Log.i("ChipService", "BAC key generated." + bacKey.toString());

            cardService = CardService.getInstance(isoDep);
            cardService.open();

            service = new PassportService(cardService);
            service.open();

            service.sendSelectApplet(false);

            try {
                service.getInputStream(PassportService.EF_COM).read();
            } catch (Exception e) {
                service.doBAC(bacKey);
            }

            lds = new LDS();

            CardFileInputStream comIn = service.getInputStream(PassportService.EF_COM);
            lds.add(PassportService.EF_COM, comIn, comIn.getLength());
            chipData.comFile = lds.getCOMFile();

        } catch (Exception e) {
            throw e;
        }

        return chipData;
    }

    public ChipData transferChipDataSOD() throws CardServiceException, IOException {

      try
      {
          CardFileInputStream sodIn = service.getInputStream(PassportService.EF_SOD);
          lds.add(PassportService.EF_SOD, sodIn, sodIn.getLength());
          chipData.sodFile = lds.getSODFile();

            return chipData;

        } catch (Exception e) {
            throw e;
        }
    }

    public ChipData transferChipDataDG1() throws CardServiceException, IOException {

        try
        {
            CardFileInputStream dg1In = service.getInputStream(PassportService.EF_DG1);
            lds.add(PassportService.EF_DG1, dg1In, dg1In.getLength());
            chipData.dg1File = lds.getDG1File();

            return chipData;

        } catch (Exception e) {
            throw e;
        }
    }

    public ChipData transferChipDataDG2(Context context) throws CardServiceException, IOException {

        Bitmap bitmap = null;

        try
        {
            CardFileInputStream dg2In = service.getInputStream(PassportService.EF_DG2);
            lds.add(PassportService.EF_DG2, dg2In, dg2In.getLength());
            chipData.dg2File = lds.getDG2File();

            List<FaceImageInfo> allFaceImageInfos = new ArrayList<>();
            List<FaceInfo> faceInfos = chipData.dg2File.getFaceInfos();
            for (FaceInfo faceInfo : faceInfos) {
                allFaceImageInfos.addAll(faceInfo.getFaceImageInfos());
            }

            if (!allFaceImageInfos.isEmpty()) {
                FaceImageInfo faceImageInfo = allFaceImageInfos.iterator().next();

                int imageLength = faceImageInfo.getImageLength();
                DataInputStream dataInputStream = new DataInputStream(faceImageInfo.getImageInputStream());
                byte[] buffer = new byte[imageLength];
                dataInputStream.readFully(buffer, 0, imageLength);

                //chipData.dg1ByteArray = buffer;

                InputStream inputStream = new ByteArrayInputStream(buffer, 0, imageLength);

                String mimeType = faceImageInfo.getMimeType();

                //Handle when jp2 to ignore.
                if(mimeType.equalsIgnoreCase("image/jp2") || mimeType.equalsIgnoreCase("image/jpeg2000")) {
                    chipData.isSuccess = false;
                    chipData.exceptionMessage = "Image is mimetype: " + mimeType + "and there is no decoder implemented for it yet. The size of the image is: " + imageLength;
                }
                else {
                    bitmap = ImageUtil.decodeImage(context, mimeType, inputStream);
                    //bitmap = ImageUtil2.read(inputStream,imageLength, faceImageInfo.getMimeType());
                    chipData.dg2Bitmap = bitmap;
                }
            }

            return chipData;

        } catch (Exception e) {
            throw e;
        }
    }

    public ChipData getChipDataFaceInfo() throws CardServiceException, IOException {

        try
        {
            return null;

        } catch (Exception e) {
            throw e;
        }
    }
}
